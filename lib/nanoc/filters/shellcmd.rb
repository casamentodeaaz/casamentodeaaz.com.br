require 'open3'

class ShellCmdFilter < Nanoc3::Filter
  identifier :shellcmd

  def run(content, params = { cmd: 'sed s/foo/bar/' })
    Open3.popen3(params[:cmd]) do |stdin, stdout|
      stdin.write(content)
      stdin.close
      stdout.read
    end
  end
end
