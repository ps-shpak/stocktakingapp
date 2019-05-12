import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_linkify/flutter_linkify.dart';
import 'package:flutter_svg/svg.dart';
import 'package:stocktakingmobile/domain/model/qr_code_Item.dart';
import 'package:stocktakingmobile/ui/widget/spec_item.dart';
import 'package:url_launcher/url_launcher.dart';

enum RequestState {
  FirstWait,
  Wait,
  Idle,
}

class ItemPageState extends State<StatefulWidget> {
  ItemPageState(this.item) : super();

  QRCodeItem item;

  RequestState _requestState = RequestState.FirstWait;
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      new GlobalKey<RefreshIndicatorState>();

  final _iconInUse = "assets/ic_in_use.svg";
  final _iconUser = "assets/ic_user.svg";
  final _iconPlace = "assets/ic_place.svg";

  double _iconSize = 28.0;

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _refreshIndicatorKey.currentState.show();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildRefreshIndicator(),
      backgroundColor: Colors.white,
    );
  }

  Widget _buildRefreshIndicator() {
    return RefreshIndicator(
      key: _refreshIndicatorKey,
      child: ListView(
        children: <Widget>[
          _buildTitle(),
          _buildSpec(),
          _buildDescription(),
        ],
      ),
      onRefresh: () async {
        await Future.delayed(Duration(seconds: 4));
      },
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
            "Name", //item.name,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: 4),
            child: Text(
              "Type", //item.type,
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
        "Host", //item.host,
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
        "Location", //item.location,
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
      padding: EdgeInsets.only(top: 16, left: 12, right: 12, bottom: 12),
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
            child: Linkify(
              text: "Description", //item.description,
              style: TextStyle(fontSize: 16),
              onOpen: (link) => _launchLink,
            ),
          ),
        ],
      ),
    );
  }

  _launchLink(String url) async {
    try {
      if (await canLaunch(url)) {
        await launch(url);
      } else {
        return;
      }
    } catch (ex) {
      return;
    }
  }
}
