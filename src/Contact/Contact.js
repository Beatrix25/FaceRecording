import React, { Component } from 'react';
import './Contact.css';
import Linux from "./linux.png";
import Digitalis from "./digitalis.png";
import Informatika from "./informatika.png";
import Programozas from "./programozas.png";

class Contact extends Component {
    render() {
        return (
    <div>
<ul class="cards">
  <li>
    <a href="" class="card">
      <img src={Linux} class="card__image" alt="linux" />
      <div class="card__overlay">
        <div class="card__header">
                              
          <img class="card__thumb" src="https://toppng.com/uploads/preview/linux-penguin-logo-vector-free-115741999182tcqy7e57y.png" alt="" />
          <div class="card__header-text">
            <h3 class="card__title">Linux alapok</h3>            
            <span class="card__status">Hallgatók száma: 8</span>
          </div>
        </div>
        
      </div>
    </a>      
  </li>
  <li>
    <a href="" class="card">
      <img src={Digitalis} class="card__image" alt="" />
      <div class="card__overlay">        
        <div class="card__header">
                          
          <img class="card__thumb" src="https://docplayer.hu/docs-images/109/189263724/images/1-0.jpg" alt="" />
          <div class="card__header-text">
            <h3 class="card__title">Digitális kultúra</h3>
            <span class="card__status">Hallgatók száma: 17</span>
          </div>
        </div>
        
      </div>
    </a>
  </li>
  <li>
    <a href="" class="card">
      <img src={Informatika} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
                             
          <img class="card__thumb" src="https://img.halooglasi.com/slike/oglasi/Thumbs/170708/l/informatika-i-programiranje-4025076-71783034286.jpg" alt="" />
          <div class="card__header-text">
            <h3 class="card__title">Informatika</h3>
            
            <span class="card__status">Hallgatók száma: 32</span>
          </div>
        </div>
       
      </div>
    </a>
  </li>
  
  
            
       
    
</ul>



            </div>

            
        );
    }
}

export default Contact;