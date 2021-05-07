   $(document).ready(function(){
            const loadorder=()=>{
                $.ajax({
                    url:'/shop-order',
                    type:"POST",
                    success:function(data){
                        let c=1;
                        console.log(data);
                        if(data.length==0){
                            $('.order-shop-div').html(`<div style='
                            height:5rem;font-size:2rem;
                            color:red;margin:auto;
                            background-color:lightgrey;
                            text-align:center;
                            padding-top:1rem;'>No Orders Yet</div>`);
                            return
                        }
                        let output=`<table id='shop-order'>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Customer Name</th>
                                        <th style='width:20rem;'>Address</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Mobile No.</th>
                                        <th>Product</th>
                                        <th>Payment</th>
                                        <th>view</th>
                                        <th>Order</th>
                                    </tr>`;
                            data.forEach(element=>{
                                output=output.concat(`<tr>
                                    <td>${c}</td>
                                    <td>${element.userId.name}</td>
                                    <td>${element.customerId.Address},${element.customerId.area_code}</td>
                                    <td>${element.customerId.city}</td>
                                    <td>${element.customerId.state}</td>
                                    <td>${element.customerId.mobile_no}</td>
                                    <td>${element.productId.product}</td>`);
                                     if(element.payment=='Complete'){
                                    output=output.concat(`<td><button id='payment_btn' data-id='${element._id}' style='background-color:lightgreen'><b>${element.payment}</b></button></td>`);
                                     }else{
                                    output=output.concat(`<td><button id='payment_btn' data-id='${element._id}' style='background-color:#FF8484;'><b>${element.payment}</b></button></td>`);

                                     }
                                output=output.concat(`<td><a href='/order-details?id=${element._id}' data-id=${element._id}><i class='fa fa-info-circle' style='font-size:1rem;'></i></td>`);
                                     if(element.status=='Complete'){
                                   output=output.concat(`<td><button id='order-success' data-id=${element._id} style='background-color:lightgreen'><b>${element.status}</b></button></td> 
                                 </tr>`);
                                    }else{
                                   output=output.concat(`<td><button id='order-success' data-id=${element._id} style='background-color:#FF8484'><b>${element.status}</b></button></td> 
                                 </tr>`);  
                                    }
                                c++;
                            })
                            output=output.concat('</table>');
                            $('.order-shop-div').html(output);

                      
                    }
                })
            }
            loadorder();
            $(document).on('click','#payment_btn',function(){
                var id=$(this).data('id');
                  $.ajax({
                      url:'/payment',
                      type:"POST",
                      data:{id,msg:'Complete'},
                      success:function(data){
                      loadorder();
                      }
                  })
            })
            $(document).on('click','#order-success',function(){
                let status=$(this).text();
              
                if(status=='order accept'){
                    status='Process';
                }
                else if(status=='Process'){
                    status='Production';
                }
                else if(status=='Production'){
                     status='Shipped';
                }
                else if(status=='Shipped'){
                     status='Deliverd';
 
                }
                let oid=$(this).data('id');
                  $.ajax({
                      url:'/order-success',
                      type:'POST',
                      data:{oid,status},
                      success:function(data){

               
                          if(data==1){
                          loadorder();
                          }
                      }
                  })
            })

  function currDate(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
        let date=new Date().getDate();
        let month=new Date().getMonth();
        let year=new Date().getFullYear('');

        let hours=new Date().getHours();
        let min =new Date().getMinutes();
      
          curDate=`${date}-${monthNames[month]}-${year}`;
          $('#date').text(curDate);
  }
  currDate();

        })