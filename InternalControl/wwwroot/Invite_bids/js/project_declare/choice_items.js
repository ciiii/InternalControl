$(function () {
    var zTreeObj;
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'choiceRoot',
            req: {
                ParentId: '',
                LikeAllName: '',
                IsCenterPurchase: vm.model.Data.Model.IsCenterPurchase,
            },
            model: {},
            nothing: false,
            onLoad: function () {
                if (!addVm.req.IsCenterPurchase) {
                    addVm.req.IsCenterPurchase = '';
                }
                addVm.getPagingItemList();
            },
            getPagingItemList: function () {
                var setting = {
                    async: {
                        enable: true,
                        url: getUrl,
                        contentType: 'application/json',
                        autoParam: [],
                        dataType: 'json',
                        type: 'get',
                        dataFilter: filter
                    },
                    view: {
                        expandSpeed: '',
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'Id',
                            pIdKey: 'ParentId',
                        },
                        key: {
                            name: 'allName'
                        }
                    },
                    check: {
                        enable: true,
                        chkStyle: "radio",  //单选框
                        radioType: "all",
                        chkboxType: {'Y': '', 'N': ''}
                    },

                    callback: {
                        beforeDrag: zTreeBeforeDrag,   //全部禁止拖拽
                        beforeExpand: zTreeBeforeExpand,
                        beforeCheck: zTreebeforeCheck,
                        onCheck: nodeOnCheck,
                        onClick: nodeOnClick
                    }
                };

                function getUrl() {
                    var param = '?ParentId=' + addVm.req.ParentId + '&LikeAllName=' + addVm.req.LikeAllName + '&IsCenterPurchase=' + addVm.req.IsCenterPurchase;
                    var url = Code.URL_GET_ITEM_CHILD_LIST + param;
                    return url;
                }

                function zTreeBeforeExpand(treeId, treeNode) {
                    addVm.req.ParentId = treeNode.Id;
                    return addVm.req.ParentId;
                };

                function zTreebeforeCheck(treeId, treeNode) {
                    if (treeNode.isParent) {
                        $.oaNotify.error('请选择子节点！');
                    }
                }


                function zTreeBeforeDrag(treeId, treeNodes) {
                    return false;
                }

                function filter(treeId, parentNode, childNodes) {
                    if (childNodes.data && childNodes.data.length == 0) {
                        addVm.nothing = true;
                        return;
                    } else {
                        addVm.nothing = false;
                        childNodes = childNodes.data.reverse();
                        for (var i = 0; i < childNodes.length; i++) {
                            childNodes[i].allName = '【' + childNodes[i].TopItemName + '】- ' + childNodes[i].ItemKey + ' - ' + childNodes[i].Name;
                            if (childNodes[i].IsHasChild) {
                                childNodes[i].isParent = true;
                                childNodes[i].chkDisabled = true;
                            } else {
                                childNodes[i].isParent = false;
                                childNodes[i].chkDisabled = false;

                            }
                        }
                        return childNodes;
                    }
                }

                function nodeOnCheck(e, treeId, treeNode) {
                    addVm.req.ParentId = treeNode.Id;
                    if (!treeNode.isParent) {
                        $('.ztree li a').removeClass('active');
                        if (treeNode.checked) {
                            zTreeObj.checkNode(treeNode, treeNode.checked, true);
                            $('#' + treeNode.tId).find('#' + treeNode.tId + '_a').addClass('active');
                        } else {
                            $('#' + treeNode.tId).find('#' + treeNode.tId + '_a').removeClass('active');
                        }
                    }
                }

                function nodeOnClick(e, treeId, treeNode) {
                    addVm.req.ParentId = treeNode.Id;
                    $('.ztree li a').removeClass('active');
                    if (!treeNode.isParent) {
                        zTreeObj.checkNode(treeNode, !treeNode.checked, true);
                        var span = $('#' + treeNode.tId).find('#' + treeNode.tId + '_check');
                        if (span.hasClass('radio_true_full')) {
                            $('#' + treeNode.tId).find('#' + treeNode.tId + '_a').addClass('active');
                        } else {
                            $('#' + treeNode.tId).find('#' + treeNode.tId + '_a').removeClass('active');
                        }
                    }
                }

                $(document).ready(function () {
                    zTreeObj = $.fn.zTree.init($("#treeItem"), setting);
                    zTreeObj.expandAll(true);
                });

            },
            search: function () {
                addVm.req.ParentId = '';
                addVm.getPagingItemList();
                var treeObj = $.fn.zTree.getZTreeObj("treeItem");
                treeObj.checkAllNodes(false);
            },
            submit: function () {
                if (event.keyCode == 13) {
                    addVm.search();
                }
            },
            clickSubmit: function () {
                var treeObj = $.fn.zTree.getZTreeObj("treeItem");
                var nodes = treeObj.getCheckedNodes();
                vm.model.Data.List[vm.modelIndex].ItemId = nodes[0].Id;
                vm.model.Data.List[vm.modelIndex].ItemName = nodes[0].Name;
                vm.model.Data.List[vm.modelIndex].LimitOfPrice = nodes[0].LimitOfPrice;
                if (vm.model.Data.Model.IsCenterPurchase && nodes[0].TopItemName == '货物') {
                    vm.isGoods = true;
                } else {
                    vm.isGoods = false;
                    vm.model.Data.List[vm.modelIndex].DeclareNumber = 1;
                    vm.model.Data.List[vm.modelIndex].Unit = '';
                    vm.model.Data.Model.DeclareNumber = 1;
                }
                vm.model.Data.Model.ProjectType = nodes[0].TopItemName;

                vm.changeAllName();
                addVm.clickBtnReturn();
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.modal-choice .table-responsive').mCustomScrollbar({
            theme: 'dark-3',
        });
        if (addVm.req.IsCenterPurchase) {
            addVm.req.ParentId = '';
        } else {
            addVm.req.ParentId = 0;
        }

        addVm.onLoad();
        avalon.scan(document.body);
    });
});