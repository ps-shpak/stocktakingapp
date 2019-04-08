import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/navigation/item_page_navigator.dart';

class ItemPageState extends State<StatefulWidget> {
  ItemPageState({navigator: ItemPageNavigator})
      : assert(navigator != null),
        _navigator = navigator,
        super();

  ItemPageNavigator _navigator;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
    );
  }

  Widget _buildAppBar() {
    return AppBar(
      title: Text('Item page'),
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
        _buildDescription(),
        _buildSpec(),
        _buildTitle(),
      ],
    );
  }

  Widget _buildTitle() {
    return Text('Item page');
  }

  Widget _buildSpec() {
    return Text('Item page');
  }

  Widget _buildDescription() {
    return Text('Item page');
  }
}
