running via console:
1. in the root folder, simply run:
node index
2. access the page using http://localhost:8082

installing as a windows service:
1. in the root folder, simply run: (take note of the directory configuration in install-service.js)
node install-service.js
2. a couple of logins will prompt for admin access
3. login all of them and authorize the installation
4. fire up the services.msc, must be Run As Administrator
5. locate the service WebsiteAvailabilityConfigService, and right click -> start
6. access the page using http://localhost:8082

uninstalling
1. in the root folder, simply run:
node uninstall-service.js

notes:
1. you may change the configs in  the package.json and/or index.js
 - port number
 - database connections
 - etc
 
 
codes i referred from:
https://github.com/coreybutler/node-windows
https://github.com/mattlr20/MSSQL-Express-HBS-Node-CRUD
http://mfikri.com/en/blog/nodejs-mysql-crud
