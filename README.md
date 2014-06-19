```
BareBonesWiki
=============

BareBonesWiki is a succinct personal wiki in one standalone HTML file. This 
wiki, like any other similar wiki, features non-linear information organization 
schemes designed to fit one's thought process, owing to the invention of the 
?<www>-[WikiWikiWeb], Looking up information is a few keystrokes away, and 
jumping between information pieces is only one click away.

:{www}: http://www.artima.com/intv/wiki.html

The motivation stems from organizing personal experiences and in a paperback 
notebook. The verdict is that reading is hard, and writing is infinitely 
harder, because data are seldom best organized in linear fashions similar to 
a private diary. Even the most linear kinds of printed work, such as a novel, 
need to have clearly defined sections and table of contents to assist the 
reader, so the readers know what they need to know. The wiki is the closest 
software fitting that mental model for information organization.

Therefore, it makes sense to read a notebook like navigating a wiki. From 
there on, it's all about designing a robust personal notebook.

Current version: **v0.1.0**



Highlights
----------

; Word-processor level functionality
: Tables, lists, block quotations, links; BareBonesWiki has all the 
  essentials of a word processor in readable plain text. For the more 
  technologically inclined, straight embedded HTML is also available.
  
; Extensibility
; Source Readability
; Low learning curve.

  : Carefully designed base markup language that is readable in 
    source code with low learning curve.
    
  : Using CSS as visual presentation back-end, the application looks
    as good as the CSS author wants it to be.

; Hop-hop navigation
: Seamlessly jump from one piece of information onto another.

; High Portability
: Works anywhere at anytime, so long as there's a somewhat modern 
  web browser. No proprietary software needed, no Internet connection 
  necessary, and impossible to miss as a single standalone HTML file, 
  all without forgetting about languages other than English.
  
  Moreover, it's extremely small, clocking in @ ~170KB in its empty 
  state uncompressed.

; Free
: Open source project on 2-Clause BSD license.



Usage
-----

1. Download the file from """./dist/BareBonesWiki.html""". If you feel a 
   tutorial is necessary, download the manuals as well.
2. Open it with a web browser.
3. Enable Javascript, if not enabled already.
4. Enjoy.



Browser compatibility
---------------------
   
BareBonesWiki works on all reasonably modern desktop web browsers. The 
following web browsers have been tested for reliability and for varying
levels of read-write support.

; Internet Explorer 10+
; Mozilla Firefox 20+
; Google Chrome 14+
; Opera 15+
: Read-write plus automatic downloading. These web browsers are 
  recommended to use with BareBonesWiki.

; Mozilla Firefox < 20
; Google Chrome < 14
; Opera <= 12
; Apple Safari >= 3
; Any other browsers.
: Read-write, with manual downloading for saving changes made in 
  the wiki. These web browsers need to follow the instruction in
  the dialogue box after pressing the save button.

; Internet Explorer < 8
: Incompatible;

; Internet Explorer 8-9
: Read-only experience. Permanent saving is not supported due to 
  character encoding issues, as well as future consideration for
  mobile web browsers. No guarantee in stability.



License
-------

BSD-2-Clause @ ?<http://opensource.org/licenses/BSD-2-Clause>
```



Update Log
----------

=== 0.1.0 ===

==== Repository-Specific ====

- Removed the development branch from the repository; The branch turns 
  out unnecessary due to the simplicity of the project.

- Removed "Do not use" warning. Basic functionality and underlying engine 
  rewrites are complete.
  
- Modified """.gitattributes""" to enforce Unix-style line breaks throughout 
  the repository.

==== Project ====

- Added a selection menu for wiki entry mime type. No more manually typing 
  and guessing available types of wiki entries. There are three official types 
  of wiki entries.

  - Straight HTML """text/html"""
  - BakaBakaMark Wiki text """text/x-bbm"""
  - Plain text """text/plain"""
  
- Added the option to directly import HTML code into the wiki. No more 
  converting them into HTML mime type after importing them as plain text.
