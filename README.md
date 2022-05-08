# TinyKart
WIP private server for LittleBigPlanet Karting, based off of [karting], a hybrid LBPK/MDNR server that's now defunct and was written in PHP.

---

**Q: What can you do so far?**  
A: At time of writing, you can accept the EULA. Exciting, I'm aware.

**Q: Why remake the original server?**  
A: NodeJS is faster (when well-optimized) and more modern than PHP. While [karting] uses Apache, TinyKart uses [Express], the fastest NodeJS webserver. **The original server was also abandoned for [ModNationServer](https://github.com/derole1/ModNationServer), which focuses *exclusively* on ModNation Racing.**

**Q: How much has carried over from that server?**  
A: If you want to be literal, nothing has. This is a complete rewrite. If you want to be technical... well, quite a bit has carried over. It's a rewrite, but it's still based off the current code. It's like putting it through a converter, sorta. Except this is all written by hand, I promise.

**Q: Can I use this with [RPCS3]/RCN?**  
A: You should only be able to use it with [RPCS3]. It technically shouldn't be possible to do this with an unmodified PS3, but hey, anything's possible.  
  
**Q: Will this have a central server?**  
A: That's the end goal, yeah. But for now, you will have to self-host.

---

**Requirements**  
[NodeJS v14+](https://nodejs.org/en/download/)  
NPM/Yarn ([Yarn](https://yarnpkg.com/getting-started/install) recommended)  
Bash Shell ([Git Bash](https://git-scm.com/downloads) works perfectly fine for this)  
Basic understanding of SQLite 3

[karting]: https://github.com/Gamer4647/karting-archive
[Express]: https://www.npmjs.com/package/express
[RPCS3]: https://rpcs3.net/

---

## Running
0. Clone the repository:
    ```console
    $ git clone https://github.com/AutumnRivers/TinyKart.git
    ```

1. Install the dependencies:
    ```console
    $ yarn --ignore-optional
    ```
    `npm install` works as well.  
    Remove `--ignore-optional` if you plan to follow step 5 and use PM2 to keep the server running even during crashes. Do note, it's a BIG INSTALL.

2. Rename `database_template.sqlite` to `database.sqlite`:
    ```console
    $ mv database_template.sqlite database.sqlite
    ```
    If you're on Windows, use Powershell!

3. Generate HTTPS/SSL certificates for the Secure API
    1. [Install mkcert](https://github.com/FiloSottile/mkcert/blob/master/README.md#installation)
    2. Run the following code:
        ```console
        $ mkcert localhost
        ```
        (If hosting on a public server with a hostname such as `example.com` then change localhost to your hostname)
        * You most likely will get an error about the certificate being self-signed in major browsers, which will prevent you from visiting the page. Don't panic, the game doesn't check for certificate issues, so it doesn't matter.
    3. Place the files `localhost-key.pem` and `localhost.pem` in the `/security` folder.

4. Start the server:
    ```console
    $ yarn start
    ```
    Or, if you'd prefer to have everything logged to a file:
    ```console
    $ yarn startlogs
    ```
    If using NPM:
    ```console
    $ npm run startlogs
    ```

5. OPTIONAL: If you'd like to keep the server running even when it crashes, you can install `pm2`. If you didn't add `--ignore-optional` to your original install command, you can run pm2 with the following command:
    ```console
    $ yarn startpm2
    ```
    Do note that there is no option to save to a log here, but [PM2 automatically outputs everything to a log file](https://stackoverflow.com/a/55828215/9146479).

And that's all, the server should now be running.

---

