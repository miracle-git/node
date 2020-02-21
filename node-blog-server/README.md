# node-blog-server
基于node, m2-node的前后端博客项目实战

## Available Scripts

In the project directory, you can run:

- Runs the app for server in the development mode.<br>
### `npm start` or `yarn start` (recommend)
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

You can also open [http://localhost:8000/api/blog/list](http://localhost:8000/api/blog/list) to view blog list.

- Runs the app for client in the development mode.<br>
### `npm install http-server -g` to install `http-server` package.
### `cd web && http-server -p 3000` to open the client pages.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- Runs the redis server and client. <br>
### `redis-server` will start the redis server (http://127.0.0.1:6379)
### `redis-cli` will view the redis key-value.

- Run the nginx server. <br>
### `nginx` will start the nginx proxy server (http://localhost:8080)
### `sudo vi /usr/local/etc/nginx/nginx.conf` to view nginx server config.

Now you can open [http://localhost:8080/index.html](http://localhost:8080/index.html) will proxy server and client.

- Run the crontab to split the log file. <br>
### `crontab -e` to open the command.
### `* 0 * * * sh /Users/miracle/Desktop/DevOps/M2.Frontend/server/projects/node-blog-server/copy.sh`

Next you can exit the command to run `crontab -l` to view all crontab tasks.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build` or `yarn build` (recommend)
