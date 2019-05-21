<template>
  <div id="root" class="container-fluid nopadding">
        <div class="dflex flexroot">
            <header>
                <div class="profile-background">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 avatar-container text-center">
                        <img id="avatar-md" src="https://akns-images.eonline.com/eol_images/Entire_Site/2019221/rs_600x600-190321101840-600x600-emiliaclark-gj-3-21-19.jpg" alt="" srcset="">
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <h4 class="profile-name">EMILA CLARK</h4>
                        <button class="rounded-edge-btn btn btn-default">LOGOUT</button>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <nav>
                        <div class="panel-group" id="accordion">
                                <div class="panel panel-default active">
                                  <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <div class="dflex d-align-center">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Dashboard</a>
                                            <span class="caret"></span>
                                        </div>
                                    </h4>
                                  </div>
                                  <div id="collapse1" class="panel-collapse collapse in">
                                    
                                  </div>
                                </div>
                                <div class="panel panel-default">
                                  <div class="panel-heading">
                                    <h4 class="panel-title">
                                      <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Manage Employee</a>
                                    </h4>
                                  </div>
                                  <div id="collapse2" class="panel-collapse collapse">
                                    <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                                  </div>
                                </div>
                                <div class="panel panel-default">
                                  <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <div class="dflex d-align-center">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Attendance Management</a>
                                        </div>
                                    </h4>
                                  </div>
                                  <div id="collapse3" class="panel-collapse collapse">
                                    <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                                  </div>
                                </div>
                                <div class="panel panel-default">
                                  <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <div class="dflex d-align-center">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Set Schedule</a>
                                        </div>
                                    </h4>
                                  </div>
                                  <div id="collapse3" class="panel-collapse collapse">
                                    <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                                  </div>
                                </div>
                        </div> 
                </nav>
            </header>
            <article>
                <div>
                    <div class="col-lg-12">
                        <h4>EMPLOYEE SCHEDULES</h4>
                    </div>
                    <div class="col-lg-12">
                        <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">ADD NEW</button>
                    </div>
                    
                    <div class="col-lg-12">
                      <!-- <table class="table table-hover content">
                        <thead>
                          <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                          </tr>
                          <tr>
                            <td>Mary</td>
                            <td>Moe</td>
                            <td>mary@example.com</td>
                          </tr>
                          <tr>
                            <td>July</td>
                            <td>Dooley</td>
                            <td>july@example.com</td>
                          </tr>
                        </tbody>
                      </table> -->
                      <table id="example" class="mdl-data-table" style="width:100%"></table>
                    </div>
                </div>
                 <!-- Modal -->
                <div id="myModal" class="modal fade" role="dialog">
                  <div class="modal-dialog">

                      <!-- Modal content-->
                      <div class="modal-content">
                          <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                              <!-- <h4 class="modal-title">Modal Header</h4> -->
                          </div>
                          <div class="modal-body">
                              <div class="col-lg-12 text-center">
                                  <img id="avatar-md" src="https://akns-images.eonline.com/eol_images/Entire_Site/2019221/rs_600x600-190321101840-600x600-emiliaclark-gj-3-21-19.jpg" alt="" srcset="">
                                  <br><br><br><br>
                              </div>


                            <ul class="nav nav-tabs">
                              <li class="active"><a data-toggle="tab" href="#home">Personal Information</a></li>
                              <li><a data-toggle="tab" href="#menu1">Schedule Information</a></li>
                            </ul>

                            <div class="tab-content">
                              <div id="home" class="tab-pane fade in active">
                                    <br><br><br>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <div class="form-group">
                                        <label for="pwd">First Name</label>
                                        <input type="firstname" class="form-control" id="firstname">
                                      </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <div class="form-group">
                                        <label for="pwd">Last Name</label>
                                        <input type="lastname" class="form-control" id="lastname">
                                      </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <div class="form-group">
                                          <label for="pwd">Date Hired</label>
                                          <input type="firstname" class="form-control" id="firstname">
                                        </div>
                                      </div>
                                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                        <div class="form-group">
                                          <label for="pwd">Job Title</label>
                                          <input type="lastname" class="form-control" id="lastname">
                                        </div>
                                      </div>
                                      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                          <div class="form-group">
                                            <label for="pwd">Job Description</label>
                                            <input type="firstname" class="form-control" id="firstname">
                                          </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                          <div class="form-group">
                                            <label for="pwd">Department</label>
                                            <input type="lastname" class="form-control" id="lastname">
                                          </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <div class="form-group">
                                              <label for="pwd">Branch</label>
                                              <input type="lastname" class="form-control" id="lastname">
                                            </div>
                                          </div>
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <div class="form-group">
                                              <label for="pwd">SSS</label>
                                              <input type="firstname" class="form-control" id="firstname">
                                            </div>
                                          </div>
                                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <div class="form-group">
                                              <label for="pwd">TIN</label>
                                              <input type="lastname" class="form-control" id="lastname">
                                            </div>
                                          </div>
                                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <div class="form-group">
                                              <label for="pwd">HDMF</label>
                                              <input type="lastname" class="form-control" id="lastname">
                                            </div>
                                          </div>
                              </div>
                              <div id="menu1" class="tab-pane fade">
                                    <br><br><br>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <div class="form-group">
                                        <label for="pwd">Schedule Type</label>
                                        <select name="" class="form-control">
                                          <option value="">1212</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <div class="form-group">
                                        <label for="pwd">Schedule Time</label>
                                        <select name="" class="form-control">
                                          <option value="">1212</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="clearfix"></div>
                                  <br>
                                  <div class="col-lg-12 text-center sub-heading">
                                      <em>Rest Days</em>
                                  </div>
                                  <br><br>
                                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <label class="checkboxcontainer">Mon
                                        <input type="checkbox" checked="checked">
                                        <span class="checkmark"></span>
                                      </label>
                                      <label class="checkboxcontainer">Tue
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                      </label>
                                      <label class="checkboxcontainer">Wed
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                      </label>
                                      <label class="checkboxcontainer">Thu
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                      </label>
                                  </div>
                                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                      <label class="checkboxcontainer">Fri
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                      </label>
                                      <label class="checkboxcontainer">Sat
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                      </label>
                                      <label class="checkboxcontainer">Sun
                                        <input type="checkbox">
                                        <span class="checkmark"></span>
                                      </label>
                                  </div>
                                  <br><br><br>
                                  <div class="col-lg-12">
                                      <table class="table table-hover content">
                                          <thead>
                                            <tr>
                                              <th>Firstname</th>
                                              <th>Lastname</th>
                                              <th>Email</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>John</td>
                                              <td>Doe</td>
                                              <td>john@example.com</td>
                                            </tr>
                                            <tr>
                                              <td>Mary</td>
                                              <td>Moe</td>
                                              <td>mary@example.com</td>
                                            </tr>
                                            <tr>
                                              <td>July</td>
                                              <td>Dooley</td>
                                              <td>july@example.com</td>
                                            </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                            </div><!----close panel-->

                            <div class="col-lg-12 text-right">
                                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">SUBMIT</button>
                            </div>
                            <div class="clearfix"></div>
                          </div>
                          <!-- <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                          </div> -->
                      </div>

                  </div>
              </div>

            </article>
        </div>
        <footer>
        </footer>
    </div> <!--ROOT-->
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
