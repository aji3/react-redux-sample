/* ライブラリのインポート */
import React, { Component } from 'react'
import { connect } from 'react-redux'

/* Action Creatorのインポート */
import { addText, clearText } from './actions'

import {InfoTile, HeaderBar, NavigationMenu   } from 'adminlte-reactjs'

/*
  View (Reactコンポーネント):
  ユーザーの操作などを受けて dispatch() メソッドで Action Creator (./actions.jsからインポートした addText(), clearText()メソッドなど) を呼び出して、Storeにデータの変更 (stateの変更) を伝播させる
  dispatchの例: this.props.dispatch(clearText())
  dispatch() メソッドは connect() メソッド (react-reduxよりインポートされており、App.js最下部で使用) でラップすることにより使用可能になる
*/

class App extends Component {

    render() {
        return (
            <div>
              <HeaderBar></HeaderBar>
              <NavigationMenu></NavigationMenu>
              <div className='content-wrapper'>
                <section className='content' id="widgets-container">

                  <input type='text' ref='input' /><br/>
                  <button onClick={(e) => this.onAddBtnClicked(e)}   >Add</button>
                  <button onClick={(e) => this.onClearBtnClicked(e)} >Clear</button>
                  <ul>
                    {
                      //state中のオブジェクトをループさせて<li>要素を描画。stateは selector() メソッドで指定しているものがpropsとして渡ってくる
                      this.props.state.storedText.map((obj) =>
                        <li key={obj.id} >
                          {obj.text}
                        </li>
                      )
                    }
                  </ul>
                  <InfoTile width='3' content = ''
                  icon = 'fa-envelope-o'
                  stats = '1,410'
                  subject = 'Messages'
                  theme = 'bg-aqua'
                  />

              </section>
              </div>
            </div>
        )
    }

    //Add ボタンをクリックした時に呼び出される
    onAddBtnClicked(e) {
        let input = this.refs.input
        let text = input.value.trim()
        if (!text) return alert('何かテキストを入力してください。')
        input.value = ''
        // Appコンポーネントが connect() メソッドでラップされていることによって、dispatchメソッドを呼び出すことが可能になる
        // dispatch() メソッドで ActionCreator である addText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(addText(text))
    }

    //Clear ボタンをクリックした時に呼び出される
    onClearBtnClicked(e) {
        // dispatchメソッドで ActionCreator であるclearText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(clearText())
    }

}

// セレクターの定義: Appコンポーネントが必要とするデータを グローバルなstate 全体の中から取捨選択して取得する。今回は state 全体をそのままreturnしている
let selector = (state) => {
    // [storedText]というキー名はreducer.jsの最下部で設定している Store のキー名
    console.log(state.storedText);
    return {
        state: state // Key名とvalue名が同じなので return {state} でも可: Object Literal Shorthand
    }
}

// Appコンポーネントを connect() メソッドでラップした上でエクスポート
// 第一引数には上述のselector() メソッドを使って、stateの中からコンポーネントが必要とするデータを指定、第二引数にはコンポーネント自体を指定。その上でエクスポート。
export default connect(selector)(App)
