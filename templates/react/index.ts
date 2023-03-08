import { http } from '@ampt/sdk'

http.on(404, 'static/index.html')
