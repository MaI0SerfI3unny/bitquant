
const storage = {
  link_main:{
  main:[
  {
    title: "trade",
    class: "fas fa-chart-pie",
    link: '/trade-app'
  },
  {
    title: 'history',
    class: 'fas fa-ballot',
    link: '/history'
  },
  {
    title: 'instruction',
    class: 'fas fa-file-spreadsheet',
    link: '/instructions'
  }
],
alt: [
  {
    title: 'description',
    class: 'fas fa-cog',
    link: '/description'
  },
  {
    title: 'terms',
    class: 'fas fa-award',
    link: '/terms-of-use'
  }
]
},
  form_register:[
      {
      name: 'name',
      holder: 'Имя',
      type: 'text',
      ico: 'far fa-user',
      value: 'form.name'
    },
    {
      name: 'email',
      holder: 'Email',
      type: 'email',
      ico: 'far fa-envelope',
      value: 'form.email'
    },
    {
      name: 'password',
      holder: 'Пароль',
      type: 'password',
      ico: 'far fa-lock-alt',
      value: 'form.password'
    },
    {
      name: 'repassword',
      holder: 'Повторите пароль',
      type: 'password',
      ico: 'far fa-lock-alt',
      value: 'form.repassword'
    },
  ],
  form_login: [
    {
      name: 'email',
      holder: 'Email',
      type: 'email',
      ico: 'far fa-envelope',
      value: 'form.email'
    },
    {
      name:'password',
      holder: 'Password',
      type: 'password',
      ico: 'far fa-lock-alt',
      value: 'form.password'
    }
  ],
  open_trades: ['date','symbol','type','count'],
  history:['date','symbol','count','type'],
  info_chart: [
        {
          title: "dealCount",
          value: "props.alltrades",
          status: ''
        },
        {
          title: "profit",
          value: "props.wintrades",
          status: 'positive'
        },
        {
          title: "unprofit",
          value: "props.losstrades",
          status: 'negative'
        },
        {
          title: "average",
          value: "parseFloat(props.averagewin).toFixed(8)",
          status: 'positive'
        },
        {
          title: "unaverage",
          value: "parseFloat(props.averageloss).toFixed(8)",
          status: 'positive'
        },
        {
          title: "win",
          value: "parseFloat(props.winrate).toFixed(2) + '%'",
          status: "positive"
        },
        {
          title: "up",
          value: "parseFloat(props.profit).toFixed(8)",
          status: ''
    }
  ],
  signals: [
    {
      name: 'Demo',
      price: 'free',
      status: 'active'
    },
    {
    name: 'Название сигнала',
    price: 19,
    status: 'unactive',
    },
    {
    name: 'Название сигнала',
    price: 50,
    status: 'unactive',
    }
  ],

}

export const BalancePow = (balance) => {
  if (parseInt(balance) - balance === 0) {
    return balance
  }else {
    try {
    let split = balance.split(".")
    return split[0] + "." + split[1].slice(0,2)
  }catch (e) {
    return 0
   }
  }
}

  export const timestampConvert = (time) => {
    let dateTime = new Date(time * 1000);
    let date = new Date(time);
    let hours = dateTime.getHours().toString().length === 1 ? `0${dateTime.getHours().toString()}` : dateTime.getHours();
    let minutes = "0" + dateTime.getMinutes();
    let seconds = "0" + dateTime.getSeconds();
    let year = date.getFullYear();
    let month = date.getMonth().toString().length === 1 ?  `0${date.getMonth().toString()}` : date.getMonth();
    let day = date.getDay().toString().length === 1 ?  `0${date.getDay().toString()}` : date.getDay();
    let formattedTime = day + '.' + month + "." + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime
  }



export default storage
