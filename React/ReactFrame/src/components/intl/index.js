import React from 'react';
import intl from 'react-intl-universal';

export default function IntlHoc(WithComponent,locales) {
    return class IntlComponent extends React.Component {
        constructor(){
            super();
            this.state = {
                intlDone:false
            };
            if (locales){
                this.locales=Object.keys(locales);
                this.defaultLocale=sessionStorage['locale']?sessionStorage['locale']:this.locales[0]
            }
        }
        componentDidMount() {
            this.initLocale(this.defaultLocale)
        }
        initLocale(locale){
            sessionStorage['locale']=locale;
            intl.init({
                currentLocale:sessionStorage['locale']?sessionStorage['locale']:locale,
                locales:locales?locales:{"zh_CN":""}
            }).then(()=>{
                this.setState({intlDone:true})
            })
        }
        render() {
            let newProps={
                intlDone:this.state.intlDone,
                intl:intl,
                setLocale:this.initLocale.bind(this),
                defaultLocale:this.defaultLocale
            };
            return (
                <WithComponent {...this.props} {...newProps}></WithComponent>
            )
        }
    }
}