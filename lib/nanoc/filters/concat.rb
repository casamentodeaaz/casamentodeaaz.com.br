# encoding: utf-8

module Nanoc
  module Filters
    class Concat < Nanoc::Filter
      identifier :concat

      def run(content, _params = {})
        imports_items = []
        content = content.gsub(%r{^//=\s*require\s*([^\s]*)$}) do
          # Find directory for this item
          current = Pathname.new(@item[:content_filename])

          # Find absolute pathname for imported item
          imported_pathname = Pathname.new(Regexp.last_match[1])

          if imported_pathname.relative?
            imported_pathname = current.dirname.realpath + imported_pathname
          end

          next unless imported_pathname.exist?
          imported_filename = imported_pathname.realpath

          # Find matching item
          item = @items.find do |i|
            next if i[:content_filename].nil?
            Pathname.new(i[:content_filename]).realpath == imported_filename
          end

          if item.nil?
            ';' + File.read(imported_filename)

          else
            imports_items.push(item)

            # Return content file
            ';' + item.raw_content
          end
        end

        depend_on(imports_items)
        content
      end
    end
  end
end
