require 'open3'

module Jekyll
  class GitContributorsTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @path = text.strip
    end

    def render(context)
      site_source = context.registers[:site].config['source']
      file_path = File.join(site_source, @path)
      
      if File.exist?(file_path)
        # Get git log for the file
        cmd = "git log --follow --format='%an <%ae>' #{file_path} | sort | uniq"
        stdout, stderr, status = Open3.capture3(cmd)
        
        if status.success?
          contributors = stdout.split("\n").map(&:strip).reject(&:empty?)
          return contributors.join(", ")
        end
      end
      
      # Return default or empty if we couldn't get contributors
      return context['page']['author'] || 'SimpleConcepts Team'
    end
  end
end

Liquid::Template.register_tag('git_contributors', Jekyll::GitContributorsTag)
