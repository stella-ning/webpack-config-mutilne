module.exports = {
	"globals": {

	},
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
	"parserOptions": {
		"sourceType": "module"
	},
	"rules": {
		"no-console":1,
		"no-unused-vars":0,
		"no-alert":2,
		"no-eval":2,
		"semi": [1, "always"],
		"quotes": [1, "single"],
		"indent": [1, 4]
	}
}
