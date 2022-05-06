# TinyKart (Working(?) Title)
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