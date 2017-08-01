# rake start

# load react-server on port 3000
# load rails server on port 3001

task :start do
  exec 'foreman start -p 3000'
end