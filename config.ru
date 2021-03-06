use Rack::Static,
  :urls => ["/js", "/css", "/flags"],
  :root => "public"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}


# header 'Access-Control-Allow-Origin', '*'
# header 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT'
require 'rack'
require 'rack/cors'


  # headers['Access-Control-Allow-Origin'] = '*'
  # headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
  # headers['Access-Control-Request-Method'] = '*'
  # headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'

use Rack::Cors do
  #   allow do
  #   origins 'localhost:9292', '127.0.0.1:9292',
  #           /\Ahttp:\/\/192\.168\.0\.\d{1,3}(:\d+)?\z/
  #           # regular expressions can be used here

  #   resource '/file/list_all/', :headers => 'x-domain-token'
  #   resource '/file/at/*',
  #       methods: [:get, :post, :delete, :put, :patch, :options, :head],
  #       headers: 'x-domain-token',
  #       expose: ['Some-Custom-Response-Header'],
  #       max_age: 600
  #       # headers to expose
  # end
  

  allow do
    origins '*'
    resource '/public/*', headers: :any, methods: :get
  end
end