require 'nanoc'

module Nanoc
  module Filters
    class Thumbnailizr < Nanoc::Filter
      identifier :thumbnailize
      type :binary

      # jpegtran -optimize -progressive -copy none letterpress.jpg > a.jpg

      def run(filename, params = {})
        system(
          'convert',
          filename,
          '-resize', params[:size].to_s,
          '-gravity', 'center',
          '-crop', params[:size].to_s + params[:position].to_s,
          '+repage', output_filename
        )
      end
    end
  end
end
