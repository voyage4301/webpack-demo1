import axios from 'axios'

import $ from 'jquery'


import { Person } from '@/src/utils/person'
import './css/index.css'

axios.post('/article/api/articlelist/getarticlelist')
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })

let p = new Person('张三', 1400)

p.description()