def search_image(id)
  @items.select do |i|
    (i.identifier || []).include?(['/imagens/', id, '_'].join)
  end
end

def get_image_url(item, size = nil)
  path = item.identifier.split('/')
  path.insert(-2, size)
  path[-1] = (item[:url] || path[-1]) + '.' + item[:extension]
  path.compact.join('/')
end

def get_image(id, size = nil)
  item = (search_image id)[0]
  {
    url:         get_image_url(item, size),
    title:       item[:title],
    alt:         item[:alt],
    author_name: item[:author_name],
    author_url:  item[:author_url]
  }
end
