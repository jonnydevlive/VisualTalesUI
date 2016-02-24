# Visual Tales
A web platform to build your stories in a visual novel style manner.

## Contributors
Jon Craig - [jonnydevlive](https://github.com/jonnydevlive)  
Joshua Livesay - [joshualivesay](https://github.com/joshualivesay)  
David Fuka - [graveto](https://github.com/graveto)  
Vinicio Del Toro - [viniciodeltoro](https://github.com/viniciodeltoro)  
Ted Martinez - [tedma4](https://github.com/tedma4)  
Polo Santiago - [polosantiago](https://github.com/polosantiago)  
Rene Martinez - [rnemtz](https://github.com/rnemtz)  
Mark Davis - [mdavisJr](https://github.com/mdavisJr)  

## Inspiration
Japanese developers have been creating vivid experiences using visual novels for what seems like forever now. It's a powerful way to tell stories that uses the readers imagination with visual effects that allows you to say more with less.j

## Application Setup
```shell
npm install
npm install gulp -g
```

## Starting the application
```shell
npm run dev
```

## Page and NPM errors
If you run into problems with the views or npm install do this

```shell
# Remove Node Modules Folder
rm -fr node_modules

# Clear Node Cache
npm cache clear

# Reinstall Modules
npm install
```

## Lite-Server Ubuntu Error
If you have you're having trouble with lite-server on Ubuntu try:
```shell
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

Source:  
[http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)