export const formDesign = () =>(`
<div class="card my-2">
<div class="card-body">
    <h5 class="card-title text-center" id="formCardHeader">Add a new note</h5>
    <form id="addForm">
                <div class="form-group">
                    <input id="Title" type="text" class="form-control" placeholder="Title" >
                </div>
                <div class="form-group">
                    <textarea  id="Content" class="form-control" placeholder="Content" cols="30" rows="10"></textarea>
                </div>
                <div class="form-group">  
                <select id="Importance" class="form-control mb-2" required>               
                    <option value="dark">Normal</option>
                    <option value="warning">Important</option>
                    <option value="danger">Very Important</option>
                  </select> 
                </div>
                <button id="btnSave"  class="btn btn-outline-dark btn-block">Save</button> 
                <button id="btnSaveEdit"  class="btn btn-outline-dark btn-block d-none">Save Changes</button> 
                <button id="btnCancelEdit"  class="btn btn-outline-dark btn-block d-none">Cancel</button>   
    </form>      
</div>
</div>


`)