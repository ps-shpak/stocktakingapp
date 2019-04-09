import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/svg.dart';
import 'package:stocktakingmobile/navigation/item_page_navigator.dart';
import 'package:stocktakingmobile/ui/widget/spec_item.dart';

class ItemPageState extends State<StatefulWidget> {
  ItemPageState({navigator: ItemPageNavigator})
      : assert(navigator != null),
        _navigator = navigator,
        super();

  ItemPageNavigator _navigator;

  final _iconInUse = "assets/ic_in_use.svg";
  final _iconUser = "assets/ic_user.svg";
  final _iconPlace = "assets/ic_place.svg";

  double _iconSize = 28.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
      backgroundColor: Colors.white,
    );
  }

  Widget _buildAppBar() {
    return AppBar(
      backgroundColor: Colors.orangeAccent,
      elevation: 1,
      leading: IconButton(
        icon: Icon(
          Icons.arrow_back,
          color: Colors.black,
        ),
        onPressed: () {
          _navigator.close(context);
        },
      ),
    );
  }

  Widget _buildBody() {
    return ListView(
      children: <Widget>[
        _buildTitle(),
        _buildSpec(),
        _buildDescription(),
      ],
    );
  }

  Widget _buildTitle() {
    return Container(
      padding: EdgeInsets.only(top: 26, left: 12, right: 12),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Офисная тумбочка',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: 4),
            child: Text(
              'Мебель',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpec() {
    return Padding(
      padding: EdgeInsets.only(top: 20, left: 12, right: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          _buildUsing(),
          _buildUser(),
          _buildPlace(),
        ],
      ),
    );
  }

  Widget _buildUsing() {
    return SpecItem(
      icon: SvgPicture.asset(
        _iconInUse,
        width: _iconSize,
        height: _iconSize,
      ),
      text: Text(
        "Используется",
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
          color: Colors.green,
        ),
      ),
    );
  }

  Widget _buildUser() {
    return SpecItem(
      icon: SvgPicture.asset(
        _iconUser,
        width: _iconSize,
        height: _iconSize,
      ),
      text: Text(
        "Ivan Andreyshev",
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
    );
  }

  Widget _buildPlace() {
    return SpecItem(
      icon: SvgPicture.asset(
        _iconPlace,
        width: _iconSize,
        height: _iconSize,
      ),
      text: Text(
        "Room 42",
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
    );
  }

  Widget _buildDescription() {
    return Container(
      padding: EdgeInsets.only(top: 16, left: 12, right: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Описание',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: 6),
            child: Text('Item page'),
          ),
        ],
      ),
    );
  }
}
