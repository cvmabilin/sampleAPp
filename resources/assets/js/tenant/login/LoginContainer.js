import React, { Component, Fragment } from 'react'
import { Text, Container, Form, Item, Input, Label, Content, H3, Button, Icon  } from 'native-base'
import base64 from 'react-native-base64'
import css from '../../shared/style/loginStyle'
import { userLogin } from './login-actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import tenantUserController from '../../../../../Controller/realm/tenantUserController'
import systemSettingsController from '../../../../../Controller/realm/systemSettingsController'
import { alertAfterTransac } from '../../shared/alert/AlertMessage'

class Login extends Component {

    state = {
        username: '',
        password: '',
        code: ''
    }

    componentDidMount() {
        this.checkExistingUser()
        // this.apiBasicAuthGet()
    }

    checkExistingUser = () => {
        let data = tenantUserController.getUsers()

        if (data.length == 0) {
            tenantUserController.saveUser({
                code: 'tmj',
                username: 'admin',
                password: '123',
                first_name: 'Christian',
                middle_name: '',
                last_name: 'Mabilin',
            })
            systemSettingsController.setLocale()
        }
    }

    apiBasicAuthGet = () => {
        let url = "https://test2.intra-mart-dev.tmj.cloud/im/logic/api/basic/cvm/test"

        const username = "tmjp_Christian"
        const password = "tmj123"

        let encodeAuth = base64.encode(username + ":" + password)

        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + encodeAuth)

        fetch(url, {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
        .then(data => alertAfterTransac('GET Query', JSON.stringify(data, null, '\t'), () => true) )

    }

    onUserLogin = () => {

        const { username, password, code } = this.state

        return this.props.userLogin({username, password, code}, this.props.navigation)
    }

    render() {

        const { username, password, code } = this.state
        let { trans } = this.props.screenProps
        return (
            <Fragment>
                <Container style={ css.welcome }>
                    <H3 style={ css.fontColor }>{ trans.t('login.welcome') }</H3>
                </Container>

                <Container style={ css.form }>
                    <Content padder>
                        <Text>{ trans.t('login.form.heading') }</Text>
                        <Form>
                            <Item fixedLabel>
                                <Icon type='AntDesign' name='home' />
                                <Label>{ trans.t('login.form.code') }</Label>
                                <Input value={code} onChangeText={ (code) => this.setState({code}) } autoCapitalize='none' />
                            </Item>
                            <Item fixedLabel>
                                <Icon type='AntDesign' name='user' />
                                <Label>{ trans.t('login.form.username') }</Label>
                                <Input value={username} onChangeText={ (username) => this.setState({username}) } autoCapitalize='none' />
                            </Item>
                            <Item fixedLabel >
                                <Icon type='AntDesign' name='lock' />
                                <Label>{ trans.t('login.form.password') }</Label>
                                <Input secureTextEntry={true} value={password} onChangeText={ (password) => this.setState({password}) } autoCapitalize='none' />
                            </Item>
                        </Form>
                    </Content>
                </Container>

                <Container style={ css.commands }> 
                    <Content padder>
                        <Button success block
                            onPress={ () => this.onUserLogin() }
                        >
                            <Text>{ trans.t('login.buttons.sign_in') }</Text>
                        </Button>
                        <Button transparent>
                            <Text>{ trans.t('login.buttons.forgot') }</Text>
                        </Button >    
                    </Content>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { loggedIn } = state.login
    return {
        loggedIn
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        userLogin,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Login)

