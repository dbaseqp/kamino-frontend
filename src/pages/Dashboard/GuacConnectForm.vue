<template>
    <card class="h-100" title="Connect to a VM">
        <div>
            <div class="text-center">
                <b-button @click="openModal" pill variant="info">Connect to a VM</b-button>
            </div>
        </div>
        <b-modal ref="form-modal" title="Build Your Custom Pod" :no-close-on-backdrop="true" scrollable>
            <div v-if="!connect">
                <b-form id="form-custom" @submit="doConnect()">
                    <div class="form-group">
                        <label for="scheme">Protocol</label>
                        <b-form-input v-model="scheme" id="scheme" placeholder="Protocol" required></b-form-input>
                    </div>
                    <div class="form-group">
                        <label for="hostname">IP Address</label>
                        <b-form-input v-model="hostname" id="hostname" placeholder="Enter IP address" required></b-form-input>
                    </div>
                    <div class="form-group">
                        <label for="user">Username</label>
                        <b-form-input v-model="user" id="user" placeholder="Enter username" required></b-form-input>
                    </div>
                    <div class="form-group">
                        <label for="pass">Password</label>
                        <b-form-input v-model="pass" id="pass" placeholder="Enter password" required></b-form-input>
                    </div>
                    <div class="form-group">
                        <label for="port">Port</label>
                        <b-form-input v-model="port" id="port" placeholder="Enter port" required></b-form-input>
                    </div>
                    <div class="form-group">
                        <label for="nla">NLA</label>
                        <b-form-input v-model="security" id="nla" placeholder="type nla here for Network Level Authentication"></b-form-input>
                    </div>
                        <div class="field">
                            <label>Query string</label>
                            <span class="pl-1">{{scrubbedQuery}}</span>
                        </div>
                    <div class="form-group">
                        <div class="d-flex flex-row align-items-center">
                            <b-form-checkbox v-model="ignoreCert" name="check-button" switch>
                            </b-form-checkbox> Ignore Certificate <b>(Checked: {{ ignoreCert }})</b>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="d-flex flex-row align-items-center">
                            <b-form-checkbox v-model="forceHttp" name="check-button" switch>
                            </b-form-checkbox> Force HTTP Tunnel <b>(Checked: {{ forceHttp }})</b>
                        </div>
                    </div>
                </b-form>
            </div>
            
            <template #modal-footer="{ cancel }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button variant="secondary" @click="cancel()">
                    Cancel
                </b-button>
                <b-button type="submit" form="form-custom" variant="primary">
                    Connect
                </b-button>
            </template>
        </b-modal>
        <guac-client v-else :query="query" :force-http="forceHttp"/>
    </card>
</template>

<script>
  import GuacClient from '@/components/GuacClient'

  export default {
    components: {
      GuacClient
    },
    data() {
      return {
        connect: false,

        scheme: 'telnet',
        hostname: 'towel.blinkenlights.nl',
        port: '3389',
        user: '',
        pass: '',
        ignoreCert: true,
        security: '',
        forceHttp: false,
      }
    },
    computed: {
      queryObj() {
        return {
          scheme: this.scheme,
          hostname: this.hostname,
          port: this.port,
          'ignore-cert': this.ignoreCert,
          security: this.nla,
          username: this.user,
          password: this.pass
        }
      },
      query() {
        const queryString = []
        for (const [k, v] of Object.entries(this.queryObj)) {
          if (v) {
            queryString.push(`${k}=${encodeURIComponent(v)}`)
          }
        }
        return queryString.join("&")
      },
      scrubbedQuery() {
        return this.query.replace(/password=[^& ]+/, 'password=****')
      }
    },
    methods: {
      doConnect() {
        if (window.localStorage) {
          window.localStorage.setItem('query', JSON.stringify(this.queryObj))
        }
        this.connect = true
      },
      openModal() {
            this.$refs["form-modal"].show()
    },
    mounted() {
      if (window.localStorage && window.localStorage.getItem('query')) {
        let query
        try {
          query = JSON.parse(window.localStorage.getItem('query'))
        } catch (e) {
          window.localStorage.setItem('query', '{}')
          return
        }
        this.scheme = query.scheme
        this.hostname = query.hostname
        this.port = query.port
        this.ignoreCert = query['ignore-cert']
        this.nla = query.nla
        this.user = query.username
        this.pass = query.password
      }
    }
}
  }
</script>

<style>
    html, body {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 16pt;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 1rem;
    }

    h1 {
        text-align: center;
    }

    .field {
        display: grid;
        grid-template-columns: 300px 1fr;
        margin-bottom: 1rem;
    }

    label {
        text-align: right;
    }

    label::after {
        content: ': '
    }

    input {
        margin-left: 1rem;
        margin-right: 1rem;
        font-size: 16pt;
        border: 1px solid black;
        border-radius: 2px;
        padding-left: 0.5rem;
    }

    .center {
        text-align: center;
    }

    .connect {
        font-size: 16pt;
        background: none;
        border: 1px solid black;
        border-radius: 5px;
        padding: .5rem 1rem;
    }

    .pl-1 {
        padding-left: 1rem;
    }
</style>