这是主流程仿照了慕课网教程的练习项目
-------
### 包含的内容：
    react全家桶
    Mongodb
    webpack
    axios
    计划使用jest进行单元测试
### 记录部分依赖项：
    cookie-parser
    express
    babel-plugin-import
    less-loader less
    utility 加密用的第三方库
    prop-types react提供的 对react组件中props对象中的变量进行类型检测
### 笔记：
    prop-types
    摘自： https://www.cnblogs.com/penghuwan/p/6796139.html
##### 利用propTypes检测全部数据类型的变量
    class Son extends React.Component{
        render(){
            return (<div}>
                {this.props.optionalArray}
                {this.props.optionalBool}
                ...
            </div>)
        }
    }
    Son.propTypes = {
         optionalArray: PropTypes.array,//检测数组类型
         optionalBool: PropTypes.bool,//检测布尔类型
         optionalFunc: PropTypes.func,//检测函数（Function类型）
         optionalNumber: PropTypes.number,//检测数字
         optionalObject: PropTypes.object,//检测对象
         optionalString: PropTypes.string,//检测字符串
         optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
    }
##### 五种基本类型中的undefined和null并不在此列，propTypes类型检测的缺憾之一是，对于undefined和null的值，它无法捕捉错误

##### 通过isRequired检测props中某个必要的属性（如果该属性不存在就报错）
    Son.propTypes = {
        number:PropTypes.number.isRequired
    }
##### 通过oneOfType实现多选择检测——可规定多个检测通过的数据类型
    Son.propTypes = {
       number:PropTypes.oneOfType(
           [PropTypes.string,PropTypes.number]
         )
    }
##### 通过oneOf实现多选择检测——可规定多个检测通过的变量的值
    Son.propTypes = {
        number:PropTypes.oneOf(
              [12,13]
          )
    }
##### arrayOf,objectOf实现多重嵌套检测
    Son.propTypes = {
         array:PropTypes.arrayOf(PropTypes.number)
    }
    把<Son array = {[1,2,3,4]}/>改为<Son array = {['1','2','3','4']}/>，报错
##### 通过shape方法检测目标对象不同属性的不同数据类型
    Son.propTypes = {
         object:PropTypes.shape({
         name:PropTypes.string,
         age:PropTypes.number
          })
    }