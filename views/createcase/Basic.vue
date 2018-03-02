<template>
  <div>
     <div class="tile is-ancestor"  v-if="personname===''">
        No estas logeado
     </div>
     <div class="tile is-ancestor"  v-else>
        <div class='tile is-parent'>
           <article class='tile is-child box'>
              <h1 class='title'>Formulario Para la Creacion de Casos</h1>
              <div class='block'>
                 <div class='control is-horizontal'>
                    <div class='control-label'>
                       <label class='label'>Titulo</label>
                    </div>
                    <div class='control is-grouped'>
                       <p class='control is-expanded'>
                          <input class='input' type='text' v-model='tittle' placeholder='Titulo'>
                       </p>
                       <p class='control is-expanded'>
                          <input class='input' type='text' v-model='who'  placeholder='¿Quien lo Solicita?'>
                       </p>
                    </div>
                 </div>
                 <div class='control is-horizontal'>
                    <div class='control-label'>
                       <label class='label'>Tipo de Caso</label>
                    </div>
                    <div class='control'>
                       <div class='select is-fullwidth'>
                          <select v-model='type' >
                             <option v-for='casetype in casestypes' :value='casetype.Code'>{{ casetype.Comment }}</option>
                          </select>
                       </div>
                    </div>
                 </div>
                 <div class='control is-horizontal'>
                    <div class='control-label'>
                       <label class='label'>Descripcion</label>
                    </div>
                    <div class='control is-grouped' >
                       <p class='control is-expanded'>
                          <textarea v-model='comment' class='textarea' placeholder='Comente aquí su consulta.' style="width: 500px;"></textarea>
                       </p>
                       <table>
                          <tr>
                             <td>
                                <form id = 'attachform1' enctype="multipart/form-data"  class='control is-expanded'>
                                   <input id= 'myfile1' name ="myfile1" class='input' type='file' multiple style="width: 300px;">
                                </form>
                             </td>
                          </tr>
                          <tr v-if="rows>1">
                             <td>
                                <form id = 'attachform2' enctype="multipart/form-data"  class='control is-expanded'>
                                   <input id= 'myfile2' name ="myfile2" class='input' type='file' multiple style="width: 300px;">
                                </form>
                             </td>
                          </tr>
                         <tr v-if="rows>2">
                           <td>
                             <form id = 'attachform3' enctype="multipart/form-data"  class='control is-expanded'>
                               <input id= 'myfile3' name ="myfile3" class='input' type='file' multiple style="width: 300px;">
                             </form>
                           </td>
                         </tr>
                         <tr v-if="rows>3">
                           <td>
                             <form id = 'attachform4' enctype="multipart/form-data"  class='control is-expanded'>
                               <input id= 'myfile4' name ="myfile4" class='input' type='file' multiple style="width: 300px;">
                             </form>
                           </td>
                         </tr>
                         <tr v-if="rows>4">
                           <td>
                             <form id = 'attachform5' enctype="multipart/form-data"  class='control is-expanded'>
                               <input id= 'myfile5' name ="myfile5" class='input' type='file' multiple style="width: 300px;">
                             </form>
                           </td>
                         </tr>
                         <tr v-if="rows>5">
                           <td>
                             <form id = 'attachform6' enctype="multipart/form-data"  class='control is-expanded'>
                               <input id= 'myfile6' name ="myfile6" class='input' type='file' multiple style="width: 300px;">
                             </form>
                           </td>
                         </tr>

                         <tr v-if="rows<6">
                           <td>
                             <button class='button is-link' v-on:click='addmoreattach()'>Agregar mas</button>
                           </td>
                         </tr>
                       </table>
                    </div>
                 </div>
                 <div class='control is-horizontal'>
                    <div class='control-label'>
                       <label class='label'></label>
                    </div>
                    <div class='control'>
                       <button class='button is-primary' v-on:click='onclickfn()' :disabled='disablebutton == 1 ? true : false'>Enviar</button>
                       <button class='button is-link' v-on:click='onclickcan()'>Cancel</button>
                    </div>
                 </div>
              </div>
           </article>
        </div>
     </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import store from './../../store'
const { state } = store
import { INIT_DATA } from 'vuex-store/mutation-types'
import Vue from 'vue'
import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)
var $ = window.jQuery = require('jquery');
const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}
export default {
  components: {
    Notification
  },
  data () {
    return {
      rows:1,
      tittle: '',
      who: '',
      type: '',
      comment: '',
      disable: 0
    }
  },
  stated: {},
  computed: {
    personname () {
      return state.app.personname
    },
    disablebutton () {
      return this.disable
    },
    casestypes () {
      return state.app.casestypes
    }
  },
  methods: {
    ...mapActions([
      'addCase'
    ]),
    progressHandlingFunction (e)
    {
      console.log(e)
    },
    addmoreattach()
    {
      this.rows += 1
    },
    uploadAttach (sernr,id){
      console.log(id)
      console.log($('#myfile'+id))
      console.logfilelist
      console.log("va files")
      if (!$('#myfile'+id))
      { return false}
      let filelist
      try {
        filelist = $('#myfile' + id)[0].files
      }
      catch (e)
        {
          filelist=[]
        }
      console.log(filelist)
      if (filelist.length==0)
      {
        return false
      }
      var additional_data = {}
      additional_data['OriginRecordName'] = 'Case'
      additional_data['OriginId'] = sernr
      var formid = 'attachform'
      var formData = new FormData($.find('#' + formid))
      $.each($('#myfile'+id)[0].files, function(i, file) {
          formData.append('file-'+i, file);
      });
      if (!additional_data) additional_data = {}
      for (let k of Object.keys(additional_data)) {
          formData.append(k , additional_data[k])
      }
      $.ajax({
        url: window.location.origin + '/oo/api/create_attach',  //Server script to process data
        type: 'POST',
        xhr: function() { // Custom XMLHttpRequest
          var myXhr = $.ajaxSettings.xhr()
          if (myXhr.upload) { // Check if upload property exists
            myXhr.upload.addEventListener('progress', this.progressHandlingFunction, false) // For handling the progress of the upload
          }
          return myXhr
        },
        // Ajax events
        beforeSend: () => {
          console.log('beforeSend', arguments)
        },
        success: () => {
          // oo.ui.dialogs.resolve(id, true)
          console.log('success', arguments)
        },
        error: (error) => {
          // oo.ui.dialogs.resolve(id, false)
          console.log('error', error)
        },
        // Form data
        data: formData,
        // Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
      })
    },
    onclickcan () {
      // this.uploadAttach('46747')
      this.$router.push('/cases/basic')
    },
    onclickfn () {
      this.disable = 1
      if (!this.tittle || !this.who || !this.type || !this.comment) {
        openNotification({
          message: 'Debe completar todos los campos.',
          type: 'warning',
          duration: 4500
        })
        this.disable = 0
        return false
      }
      this.$http({
        url: '/intranet/api/savecase',
        transformResponse: [(data) => {
          return JSON.parse(data)
        }],
        params: {
          parameters: {
            title: this.tittle,
            who: this.who,
            type: this.type,
            comment: this.comment
          }
        }
      }).then((response) => {
        console.log("TEST RESPONSE")
        console.log(response)
        console.log(response.data)
        console.log(response.data.ok)
        console.log(response.data.ok == 'false')
        console.log(response.data.ok == false)
        if (response.data.ok == false) {
          openNotification({
            message: 'No se ha creado el caso: ' + response.data.errormsg,
            type: 'danger',
            duration: 4500
          })
          this.disable = 0
          return false
        }
        else {
          console.log("then")
          this.disable = 0
          this.tittle = ''
          this.who = ''
          this.type = ''
          this.comment = ''
          this.uploadAttach(response.data.sernr, 1)
          this.uploadAttach(response.data.sernr, 2)
          this.uploadAttach(response.data.sernr, 3)
          this.uploadAttach(response.data.sernr, 4)
          this.uploadAttach(response.data.sernr, 5)
          this.uploadAttach(response.data.sernr, 6)
          this.$http({
            url: '/intranet/api/datafetch',
            transformResponse: [(data) => {
              return JSON.parse(data)
            }],
            params: {
              parameters: {
                Normalized: false,
                NumberOfDays: false,
                DataPeriod: false,
                Elements: []
              }
            }
          }).then((response) => {
            console.log("then22")
            console.log(response.data)
            var arrayLength = response.data.records.length
            var data = []
            for (var i = 0; i < arrayLength; i++) {
              let obj = JSON.parse(response.data.records[i])
              let dic = {}
              dic.SerNr = obj.SerNr
              dic.CaseTypeComment = obj.CaseTypeComment
              dic.Asignee = obj.Asignee
              dic.ProblemDesc = obj.ProblemDesc
              dic.CaseComment = obj.CaseComment
              dic.StatusName = obj.StatusName
              dic.TransDate = obj.TransDate
              dic.TransTime = obj.TransTime
              dic.State = obj.State
              data.push(dic)
            }
            console.log("llego a init")
            store.commit(INIT_DATA, {
              data: data,
              casestypes: response.data.casetype,
              personname: response.data.personname,
              clientstate: response.data.clientstates,
              inews: response.data.inews
            })
            openNotification({
              message: 'Se ha creado el caso.',
              type: 'success',
              duration: 4500
            })
          }).catch((error) => {
            console.log("catch")
            openNotification({
              message: 'Ha ocurrido un error.',
              type: 'danger',
              duration: 4500
            })
            console.log(error)
          })
          this.$router.push('/cases/basic/')
          // alert('Se ha creado el caso.') // eslint-disable-line no-alert
        }
      }).catch((error) => {
        openNotification({
          message: 'Ha ocurrido un error.',
          type: 'danger',
          duration: 4500
        })
        // alert(error) // eslint-disable-line no-alert
        console.log(error)
      })
    }
  }
}
</script>
<style lang='scss'>
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
