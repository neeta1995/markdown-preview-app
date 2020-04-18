import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import * as serviceWorker from './serviceWorker';
import marked from "marked";

marked.setOptions({
  breaks:true
})

const renderer = new marked.Renderer(); //converts md to html

class MarkdownPreview extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      markdown: placeholder
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e)
  {
    this.setState({
      markdown: e.target.value
    })
  }

  render(){
    return(
      <div>
        <h1 className="title">Markdown Preview</h1>
        <hr></hr>
        <div className="appWrap">
          <div className="editorWrap">
          <Toolbar text="Editor"></Toolbar>
          <Editor markdown={this.state.markdown} onChange={this.handleChange}></Editor>
          </div>
          <div className="previewWrap">
          <Toolbar text="Preview"></Toolbar>
          <Preview markdown={this.state.markdown}></Preview>
          </div>
        </div>
      </div>
    )
  }
}

const Toolbar = props => {
  return <div className="toolbar">{props.text}</div>;
}

const Editor = props => {
  return (
    <textarea id="editor" value={props.markdown} onChange={props.onChange} type="text"></textarea>
  )
}

const Preview = props => {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
    />
  )
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://libormarko.github.io/), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(
 <MarkdownPreview/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
