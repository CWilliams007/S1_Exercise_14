"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case
   Author: Chad Williams 
   Date: 3.29.19 

   Filename: bc_outline.js
   Function List
   =============
   makeOutline()
      Generates the text of the table of contents
      as a nested list
   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array
*/

// Generates an outline based on h1 through h6 headings in the source document 
window.onload = makeOutline;

function makeOutline() {
      // Location of the outline 
      var outline = document.getElementById("outline");

      // Source document for the outline 
      var source = document.getElementById("doc");

      var mainHeading = document.createElement('h1');
      var outlineList = document.createElement('ol');
      var headingText = document.createTextNode('Outline');

      mainHeading.appendChild(headingText);
      outline.appendChild(mainHeading);
      outline.appendChild(outlineList);

      createList(source, outlineList);
}

function createList(source, outlineList) {
      // heading for the outline
      var headings = ['H1', 'H2', 'H3', 'H5', 'H6'];
      //previous level of the headings
      var prevLevel = 0;
      // running total of article headings
      var headNum = 0;
      // loop through all child nodes of source article until no child nodes are left
      for (var n = source.firstChild; n !== null; n = n.nextSibling) {
            var headLevel = headings.indexOf(n.nodeName);
            if (headLevel !== -1) {
                  // add id to heading if it is missing
                  headNum++;
                  if (n.hasAttribute("id") === false) {
                        n.setAttribute("id", "head" + headNum);
                  }
                  var listElem = document.createElement('li');

                  var linkElem = document.createElement('a');
                  linkElem.innerHTML = n.innerHTML;
                  linkElem.setAttribute('href', '#', +n.id);
                  listElem.appendChild(linkElem);
                  if (headLevel === prevLevel) {
                        // append list item to current list
                        outlineList.appendChild(listElem);
                  } else if (headLevel > prevLevel) {
                        // start new nested list
                        var nestedList = document.createElement('ol')
                        // append nest list to last item in curr list
                        nestedList.appendChild(listElem);
                        outlineList.lastChild.appendChild(nestedList);
                        // change curr list to nest 
                        outlineList = nestedList;
                  } else {
                        // append entry to higher list
                        var levelup = prevLevel - headLevel;
                        for (var i = 1; i <= levelup; i++) {
                              outlineList = outlineList.parentNode.parentNode;
                        }
                  }

                  // update value of prevLevel
                  prevLevel = headLevel;
            }
      }

}

document.getElementsByTagName('body');