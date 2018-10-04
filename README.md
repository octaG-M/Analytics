# Raphaël:/Analytics

I use these scripts (Raphaël.js, version 2.2.1 + analytics.js + popup.js) to display statistics about class attendance at a Romanian college.

The original Raphaël.js: http://dmitrybaranovskiy.github.io/raphael/.

They work as follows:

**First step** - Place the data inside the HTML code of the page:

```html
<div id="wrapper_for_NAME-OF-THE-FIRST-CLASS">
   <table id="data_NAME-OF-THE-FIRST-CLASS">
   <tfoot>
   <tr>
    <th>21.II</th> <!-- date of the class -->
    <th>28.II</th>
    <th>7.III</th>
    <th>14.III</th>
   </tr>
   </tfoot>
   <tbody>
   <tr>
    <td>15</td> <!-- number of participants -->
    <td>18</td> <!-- each data on its own column -->
    <td>12</td>
    <td>11</td>
   </tr>
   </tbody>
   </table>
   <div id="holder_NAME-OF-THE-FIRST-CLASS"></div>
</div>
<p style="height:100px;"></p> <!-- this vertical space is just a separator of tables... -->    
<div id="wrapper_for_NAME-OF-THE-SECOND-CLASS">
   <table id="data_NAME-OF-THE-SECOND-CLASS">
   <tfoot>
   <tr>
    <th>10.II</th>
    <th>23.II</th>
    <th>9.III</th>
   </tr>
   </tfoot>
   <tbody>
   <tr>
    <td>12</td>
    <td>7</td>
    <td>23</td>
    <td>5</td>
   </tr>
   </tbody>
   </table>
   <div id="holder_NAME-OF-THE-SECOND-CLASS"></div>
</div>
<p style="height:100px;"></p>
```

And the third class, and the fourth one, and so on...

**Second step** - Some styling for these divs in the CSS code of the page should be inserted
(otherwise, a part of the Raphaël magic won't show up):

```css
/**
* for Raphael.js v. 2.2.1
*/
#holder_NAME-OF-THE-FIRST-CLASS, #holder_NAME-OF-THE-SECOND-CLASS {   
    width: 40px;
    height: 200px;  
    margin: 10px; 
    padding: 0;
}
#wrapper_for_NAME-OF-THE-FIRST-CLASS, #wrapper_NAME-OF-THE-SECOND-CLASS { 
    width: 100%;  
    height:auto; 
    margin: 0;
    padding: 0;
}
```

**Third step** - Insert the relevant information about names and dates and colors inside  *analytics.js*:

```js
var cursurile_mele = ["NAME-OF-THE-FIRST-CLASS", "NAME-OF-THE-SECOND-CLASS"],
    culorile_mele = ["#8A0808", "#08298A"], //colors of the table background
    semestrele_mele = ["2018", "2019"]; //years for the two semesters
```
