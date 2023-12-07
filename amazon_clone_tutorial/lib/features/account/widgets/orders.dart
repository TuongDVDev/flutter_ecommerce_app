import 'package:amazon_clone_tutorial/constants/global_variables.dart';
import 'package:amazon_clone_tutorial/features/account/widgets/single_product.dart';
import 'package:flutter/material.dart';

class Orders extends StatefulWidget {
  const Orders({Key? key}) : super(key: key);

  @override
  State<Orders> createState() => _OrdersState();
}

class _OrdersState extends State<Orders> {
  // Temporary list
  List list = [
    'https://images.unsplash.com/photo-1701600713610-0f724c65168d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
    'https://media.istockphoto.com/id/1403675366/photo/winter-forest-top-view.webp?s=170667a&w=0&k=20&c=3cq7hnYUlavLIJUmiH3TfAdtx2ThrEVViOzCgCsgsuY=',
    'https://media.istockphoto.com/id/1360199530/photo/snow-covered-pine-trees-in-winter-forest-at-sunny-day-aerial-drone-top-down-view.webp?s=170667a&w=0&k=20&c=nXUAocASRSsOB-y4NWoAjKA-E4HXSQLD-G_99XHYBl8=',
    'https://media.istockphoto.com/id/906393078/vi/anh/k%E1%BA%BFt-c%E1%BA%A5u-c%E1%BB%A7a-b%C4%83ng-tr%C3%AAn-n%E1%BB%81n-m%C3%A0u-xanh.jpg?s=612x612&w=0&k=20&c=3X0Ppwb2C9cYD_TStLE4UDURH9c_SKdseRw2_GW6hYg=',
  ];
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.only(
                left: 15,
              ),
              child: const Text(
                'Your Orders',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(
                right: 15,
              ),
              child: Text(
                'See all',
                style: TextStyle(
                  color: GlobalVariables.selectedNavbarColor,
                ),
              ),
            ),
          ],
        ),
        //Display Orders
        Container(
          height: 170,
          padding: const EdgeInsets.only(
            left: 10,
            top: 20,
            right: 0,
          ),
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: list.length,
            itemBuilder: (context, index) {
              return SingleProduct(
                image: list[index],
              );
            },
          ),
        )
      ],
    );
  }
}
