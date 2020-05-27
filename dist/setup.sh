parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path/../lib/node_modules/lofi-cli/dist"
cp ./coreaudio.c ../node_modules/speaker/deps/mpg123/src/output/coreaudio.c
cd ../node_modules/speaker
node-gyp build