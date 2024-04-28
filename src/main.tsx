import React from 'react'
import ReactDOM from 'react-dom/client'
import { Ellipsis } from './ellipsis'

const content = 'React Native 是一个使用React和应用平台的原生功能来构建 Android 和 iOS 应用的开源框架。通过 React Native，您可以使用 JavaScript 来访问移动平台的 API，以及使用 React 组件来描述 UI 的外观和行为：一系列可重用、可嵌套的代码。你可以在下一节了解更多关于 React 的信息。但首先，让我们介绍一下组件在 React Native 中是如何工作的。'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{width: '50%', margin: 'auto'}}>
      <Ellipsis content={content}/>
    </div>
  </React.StrictMode>,
)
