#!/usr/bin/env ruby

#########################
# Preprocessing
#########################

preprocess do
  config[:tags] = []
  formats = %w(png gif jpg jpeg coffee scss sass less css xml js txt)

  @items.each do |item|
    unless item[:tags].nil? || item[:tags].empty?
      config[:tags] = config[:tags] | item[:tags]
    end
  end

  config[:tags].each do |tag|
    @items << Nanoc3::Item.new(
      "== render 'post-list', itemsList: items_with_tag('#{tag}')",
      { extension: 'html', is_hidden: true, priority: 0.3 },
      "/tags/#{to_url(tag)}/"
    )
  end

  @items.each do |item|
    if formats.include?(item[:extension]) ||
        item.identifier =~ /404|500|htaccess/
      item[:is_hidden] = true unless item.attributes.key?(:is_hidden)
    end
  end

  @items << Nanoc3::Item.new(
    '<%= xml_sitemap {} %>',
    { extension: 'xml', is_hidden: true },
    '/sitemap/'
  )

  config[:nanoc_version_info] = 'nanoc --version'.strip
  config[:gem_version_info]   = 'gem --version'.strip

end

#########################
# Images
#########################

sizes = ['200x200^', '240x160^', '800x250^', '800x600']

sizes.each do |size|
  route '/imagens/*/', rep: size do
    get_image_url item, size.gsub('^', '')
  end

  compile '/imagens/*/', rep: size do
    filter :thumbnailize, size: size, position: item[:position][size.to_sym]
    filter :image_compressor, pngout: false
  end
end

route '/(img|imagens)/*/' do
  get_image_url item
end

compile '/(img|imagens)/*/' do
  filter :image_compressor, pngout: false
end

#########################
# Block _
#########################

route %r{/.*\/_.*} do
end

compile %r{/.*\/_.*} do
end

#########################
# Statics files
#########################

route '/static/*' do
  item.identifier[7..-2]
end

compile '/static/*' do
end

#########################
# CSS
#########################

route '/sass/*' do
  item.identifier.chop.gsub(/sass/, 'css') + '.css'
end

compile '/sass/*' do
  filter :sass, syntax: :scss
  filter :yui_compressor, type: :css
end

#########################
# JS
#########################

route '/js/*' do
  item.identifier.chop + '.' + item[:extension]
end

compile '/js/*' do
  filter :concat
  filter :uglify_js, copyright: false
end

#########################
# Sitemaps
#########################

route '/sitemap/' do
  '/sitemap.xml'
end

compile '/sitemap/' do
  filter :erb
end

#########################
# Pages
#########################

route '/articles/*' do
  '/' + item[:url]  + '/index.html'
end

compile '/articles/*' do
  filter :slim
  filter :html_compressor
  layout 'article'
end

route '/tags/*' do
  item.identifier[5..-1] + 'index.html'
end

compile '/tags/*' do
  filter :slim
  filter :html_compressor
  layout 'default'
end

route '*' do
  if item.binary?
    item.identifier.chop + '.' + item[:extension]
  else
    item.identifier + 'index.html'
  end
end

compile '*' do
  if item.binary?
  else
    filter :slim
    filter :html_compressor
    layout 'default'
  end
end

layout '*', :slim
