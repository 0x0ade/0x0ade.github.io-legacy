Back in Juny, when Google I/O 2014 happened, I was fascinated by the idea of a simple, minimalistic design, made out of some kind of material. Well, it's the Material design guidelines. But Google didn't just show off Android L and Material, but also some kind of theme, design, for the web - Material for the web. Unfortunately since then, I forgot the name of the project, until...  

###Polymer.

[MORE]

It was just recently (selfnote: add publish dates; around 2014-09-25) when I noticed a tweet from the Polymer Twitter account on my timeline. As I didn't follow Polymer, I was lucky that someone else was retweeting their tweet. Recognizing their logo, I went to their homepage just to find the reference implementation of the Material guidelines for the web platform. I noticed it was lacking animations in some parts, but was more mature than my little test theme I've created by modifying Matt Graham's "Midnight".  

As I already have twice changed the design of my website, I kind of hate myself for doing it a third time. But for reference, a button (which you may not find often on my website) looks like following as of the time you are viewing this page: <a class="button" href="javascript:;">I'm a button!</a>  

As I like to do stuff by myself to learn stuff, I guess it's time to adapt my design to Polymer. I'm not going to replace it with Polymer yet. ~~Maybe I won't ever replace my design with Polymer~~. But I like that there's another, greater, better, implementation of the Material design out there.  

EDIT #1: It's great.  

I had some smaller problems with implementing the toolbar being overlapped by the posts, so I went with a header area like the old one. Also, the sidebar has been replaced by a menu button.

I still need to rework some of the on-hover effects as the cursor is the "digital hand", which means you should be able to pick up or focus on the material with the "digital hand" by hovering and write to it with the "ink" by clicking. Latter is specified by the Material guidelines, but not the focus.

Reference Polymer buttons: <paper-button raisedButton label="I'm a button!" style="background: #fff;"></paper-button> <paper-button raisedButton label="I'm a button!" style="background: #03a9f4;"></paper-button> <paper-button raisedButton label="I'm a button!" style="background: #259b24;"></paper-button> <paper-button raisedButton label="I'm a button!" style="background: #e51c23;"></paper-button>  
