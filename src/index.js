import React, { useState, useRef, useCallback, useLayoutEffect } from 'react'
import './index.css'

const defaultProps = {
  style: {},
  content: '',
  rows: 1,
  expandText: '展开',
  collapseText: '收起',
  symbol: '...',
  lineHeight: 20,
}

const Ellipsis = (props) => {
  const {
    content,
    rows,
    expandText,
    collapseText,
    symbol,
    lineHeight,
    ...rest
  } = { ...defaultProps, ...props }
  const maxHeight = Math.floor(lineHeight * (Number(rows) + 0.5))
  const [exceeded, setExceeded] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ellipsis = useRef()
  const root = useRef(null)
  const container = useRef(null)

  // 计算省略具体位置
  const tailor = useCallback((
    left,
    right
  ) => {
    const actionText = expanded ? collapseText : expandText
    if (right - left <= 1) {
      return content.slice(0, left) + symbol
    }
    const middle = Math.round((left + right) / 2)
    container.current.innerText = content.slice(0, middle) + symbol + actionText
    if ( container.current.offsetHeight <= maxHeight) {
      return tailor(middle, right)
    }
    return tailor(left, middle)
  }, [collapseText, content, expandText, expanded, maxHeight, symbol])

  // 计算省略号的位置
  const calcEllipse = useCallback(() => {
    if ( container.current.offsetHeight <= maxHeight) {
      setExceeded(false)
    } else {
      setExceeded(true)
      const end = content.length
      const ellipsised = tailor(0, end)
      ellipsis.current = ellipsised
    }
  }, [content.length, maxHeight, tailor])

  // 创建虚拟 container，内容为 contant 的内容
  const createContainer = useCallback(() => {
    if (!root.current) return
    const originStyle = window.getComputedStyle(root.current)
    container.current = document.createElement('div')
    const styleNames = Array.prototype.slice.apply(originStyle)
    styleNames.forEach((name) => {
      container.current.style.setProperty(name, originStyle.getPropertyValue(name))
    })
    container.current.style.height = 'auto'
    container.current.innerText = content
    document.body.appendChild( container.current)
    calcEllipse()
    document.body.removeChild( container.current)
  }, [calcEllipse, content])

  useLayoutEffect(() => {
    if (content) {
      createContainer()
    }
  }, [content, createContainer])

  return (
    <div ref={root} {...rest}>
      {!exceeded ? content : null}
      {exceeded && !expanded ? (
        <span>
          {ellipsis.current}
          {expandText ? (
            <span
              className="ellipsis-text"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(true)
              }}
            >
              {expandText}
            </span>
          ) : null}
        </span>
      ) : null}
      {exceeded && expanded ? (
        <span>
          {content}
          {expandText ? (
            <span
              className="ellipsis-text"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(false)
              }}
            >
              {collapseText}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  )
}
export default Ellipsis
