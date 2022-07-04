# url-service

Simple URL shortener.

## Configuration

Create a configuration file (`/config/production.json`)

Example:
```json
{
	"auth": {
		"keys": ["3692ebdc-fa90-4319-a8ff-1de848e85344"]
	},
	"http": {
		"port": 3000,
		"addr": "0.0.0.0"
	},
	"mongo": {
		"url": "mongodb://mongo/url_shortener"
	},
	"publicUrl": {
		"protocol": "https",
		"host": "example.com",
		"urlPrefix": "/l/"
	}
}
```

## Api

### Authentication

Keys can be configured in the config (`auth.keys[]`).

If one or more keys is configured requests to make links has to have an authorization header (`Authorization: Bearer <key>`).

### Create link

`POST /api/v1/link`

```json
{
	"url": "https://example.com",
	"slug": "example"
}
```

`slug` can be omitted (one will be automatically generated).