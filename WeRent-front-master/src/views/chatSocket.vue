<template>
    <div> 
        <!-- <br><br><br><br><br>
        <h2>***  CHAT  ***</h2> -->
        <div class="chat-container">
          <ul class="messages">

             <li v-if="myNickname" v-for="(msg,idx) in msgs" :key="idx">
                <div class="outgoing-message" v-if="msg.name === myNickname.name">
                  {{myNickname.name}} : &nbsp; {{msg.content}}
                </div>
                <div class="server-message" v-else-if="msg.name === 'server'">
                  {{msg.content}}
                </div>
                 <div  class="incoming-message" v-else>
                   {{owner.name}}:  &nbsp; {{msg.content}}
                </div>
              </li>
          </ul>
        <form @submit.prevent="sendMsg">
            <input class="chat-input" placeholder="your message" name="chatInput" autocomplete="off" />
            <button>Send</button>
        </form>
        </div>
    </div>
</template>
 

<script>
export default {
  name: 'chatSocket',

  props: ["owner","myNickname"],

  data() {
    return {
      currMsg: '',
      msgs: [],
      // myNickname: ''
    };
  },

  mounted() {
    // this.myNickname = user; // prompt('Your name?');
    // var str = "Hey all, I'm " + nickname + ', nice to meet you';
    this.$socket.emit('chat join', {name: this.myNickname, content: ''});
    console.log('this.owner:',this.owner);
    
  },

  sockets: {
    //   ['user_connected'](msg) {
    //   this.msgs.unshift(msg);
    // },

    ['chat message'](msg) {
      // console.log('sockets, chat message, got msg:', msg);
      this.msgs.unshift(msg);
    }
  },

  methods: {
    sendMsg(ev) {
      // console.log(ev.target.chatInput.value);
      this.$socket.emit('chat send-message', {name: this.myNickname , content: ev.target.chatInput.value});
      ev.target.chatInput.value = '';
      // this.$socket.emit('chat send-message', this.currMsg);
      // this.currMsg = '';
    }
  },

  computed: {},

  components: {}
};
</script>




 <style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font: 13px Helvetica, Arial;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages li {
  padding: 5px 10px;
}

#messages li:nth-child(odd) {
  background: #eee;
}

.chat-input {
  background-color: #fff;
  padding: 10px;
  width: 100%;
  margin: 10px 0 10px 10px;
  border-radius: 4px;
}

.chat-container {
  /* position: fixed; */
  /* bottom: 0px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 340px;
  width: 250px;
  margin: 0 auto;
  background-color: #e8e8e8;
  font-size: 1.16rem;
  color: #222;
  border-radius: 8px;
  border: 2px #9dc solid;
  padding-top: 8px;
}

ul {
  list-style: none;
  overflow-y: scroll;
  /* transform: rotate(180deg); */
  display: flex;
  flex-direction: column-reverse;
  height: inherit;

}

li {
  border-radius: 4px;
  margin: 0 10px 5px 10px;
  width: auto;
  max-width: fit-content;
  padding: 1px 5px 2px 5px;
  overflow-wrap: break-word;
  align-content: flex-end;
  /* transform: rotate(180deg); */
}

ul div {
  border-radius: 5px;
  padding: 4px;
  text-align: left;
}

.outgoing-message {
  background-color: #9dc;
}

.incoming-message {
  background-color: rgb(105, 134, 211);
}

.server-message {
  background-color: #ff9;
}

form {
  flex-direction: row;
  justify-content: space-between;
  height: initial;
}

button {
  /* background-color: #bbb; */
  background: linear-gradient(#bbb,#ccc,#bbb);
  padding: 10px;
  margin: 10px 10px 10px 0;
  border-radius: 4px;

}

</style>


<!--
       // socket.emit('chat join', nickname);

        // socket.on('chat connected', function (nickname) {
        //     $('#messages').append($('<li>').text(nickname + ' Joined'));
        // });

        // socket.on('chat message', function (msg) {
        //     $('#messages').append($('<li>').text(msg));
        // });

        // $('form').submit(function () {
        //     socket.emit('chat send-message', nickname + ':' + $('#m').val());
        //     $('#m').val('');
        //     return false;
        // });

form {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}

form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}

-->


