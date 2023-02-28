# frozen_string_literal: true
module Course::Video::UrlConcern
  extend ActiveSupport::Concern

  included do
    before_validation :convert_to_embedded_url, if: :url_changed?
  end

  # Current format captures youtube's video_id for various urls.
  YOUTUBE_FORMAT = [
    /(?:https?:\/\/)?youtu\.be\/(.+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=(.*?)(&|#|$)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/(.*?)(\?|$)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/(.*?)(#|\?|$)/,
    /(?:https?:\/\/)?(?:player\.)?youku\.com\/embed\/(.*?)(\?|$)/,

    /(?:https?:\/\/)?(?:www\.)?bilibili\.com\/video\/(.*?)\/(.*?)/,
    # https://www.bilibili.com/video/BV1us4y177NQ/?share_source=copy_web&vd_source=5b8554b44386faeead1291ad095c4a0b
    /(?:https?:\/\/)?(?:player\.)?bilibili\.com\/player\.html\?(?:.*)bvid=(.*?)(&|#|$)/,
    # http://player.bilibili.com/player.html?aid=950238715&bvid=BV1us4y177NQ&cid=1028851239&page=1
  ].freeze

  private

  # Changes the provided youtube URL to an embedded URL for display of videos.
  def convert_to_embedded_url
    puts "***************************** " + url
    youtube_id = youtube_video_id_from_link(url)
    puts "***************************** " + youtube_id
    self.url = youtube_embedded_url(youtube_id) if youtube_id
    puts "***************************** " + self.url
  end

  # Default embedded youtube url for rendering in an iframe.
  def youtube_embedded_url(video_id)
    # "https://www.youtube.com/embed/#{video_id}"
    # "https://player.youku.com/embed/#{video_id}"
    "https://player.bilibili.com/player.html?bvid=#{video_id}"
  end

  # Extracts the video ID from the yout
  def youtube_video_id_from_link(url)
    url.strip!
    YOUTUBE_FORMAT.find { |format| url =~ format } && Regexp.last_match(1)
    errors.add(:url, :invalid_url) unless Regexp.last_match(1)
    Regexp.last_match(1)
  end
end
