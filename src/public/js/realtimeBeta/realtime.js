export const renderRealtimeBeta = () =>{
    return `
    <div class="container mt-2 W-100">
    <div id="Search">   </div>
    
</div>

<div class="container mt-2">
<div class="row">
    <div class="col  col-xl-4 col-md-4">
        <div id="messages"></div>
       <div id="form"></div>
    </div>
   
    <div   class="col col-sm-12 col-12 col-lg-8 col-md-8 col-xl-8">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 row-cols-md-2 row-cols-sm-2" id="notes"></div>
    </div>
    
</div>
<script type="module" src="index.js"></script>     
`
}