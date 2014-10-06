require 'i18n'
require 'date'

def to_url(string)
  I18n.enforce_available_locales = false
  I18n.transliterate(string).downcase.gsub(/\s/, '-').gsub(/&/, 'e')
end

def date_format(d)
  date = DateTime.parse d.to_s
  date.strftime '%d/%m/%Y'
end

def post(id)
  @items.each do |item|
    return item[:url] if item.identifier.index id.to_s
  end
end
