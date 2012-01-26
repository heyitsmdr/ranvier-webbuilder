var fs   = require('fs'),
    toyaml = require('./3rdparty/toYaml');
module.exports = {
	/**
	 * Write entity data to a file
	 * @param string path  Full path to the file being written
	 * @param string index Index of the data element being written
	 * @param object data  Data in object form to be written
	 * @param func   callback
	 */
	writeData: function (path, index, data, callback)
	{
		var loadedfile = require('js-yaml').load(fs.readFileSync(path).toString('utf8'));
		loadedfile[index] = data;
		fs.writeFile(path, toyaml.toYaml(loadedfile, {yamlCompatible:true, usePadding: false}).trim(), 'utf8', callback || function () {});
	}
};
