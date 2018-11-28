$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            myMenu: vm.myMenu,
            enterpriseType: [],
            PackageOfResultNotice: vm.myDetails.ExecutePackage.PackageOfResultNotice,
            isDeadline: false,
            IsCenterPurchase: false,
            isCashDeposit: false,
            isOpeningTime: false,
            isRequire: false,
            isScrapBag: vm.isScrapBag,
            isResult: false,
            Remark: '',
            model: {
                Model: {
                    ExecuteProjectId: vm.ExecuteProject.Id,
                    Content: '',
                    Attachment: '',
                    NoticeConfirmationLetter: '',
                    NoticeAddress: '',
                    NoticeScreenShot: '',
                    PublicityWebsite: '',
                    Type: '',
                    Reason: '质疑',
                    OldTenderOfferDatetime: vm.ProjectOfInvitation.TenderOfferDatetime,
                    NewTenderOfferDatetime: '',
                    OldDeadlineOfBidBond: vm.ProjectOfInvitation.DeadlineOfBidBond,
                    NewDeadlineOfBidBond: '',
                    OldOpeningBIdTime: vm.ProjectOfInvitation.OpeningBIdTime,
                    NewOpeningBIdTime: '',
                    TechnicalRequirement: '',
                    CreatorId: vm.ExecuteProject.CreatorId,
                    CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                    Remark: ''
                },
                List: [],
                Scrap: []
            },
            onLoad: function () {
                var myMenu = addVm.myMenu;
                for (var i = 0; i < myMenu.length; i++) {
                    if (myMenu[i].StepTemplateName == '结果信息') {
                        if (myMenu[i].IsPassed && !myMenu[i].ISCurrentStepTemplate) {
                            addVm.model.Model.Type = '更正采购结果';
                            addVm.isResult = true;
                            break;
                        } else {
                            addVm.model.Model.Type = '更正采购流程';
                            addVm.isResult = false;
                            break;
                        }
                    }
                }
                addVm.model.List = [];
                addVm.IsCenterPurchase = vm.ExecuteProject.IsCenterPurchase;

                if (!addVm.isScrapBag) {
                    addVm.model.Model.NewTenderOfferDatetime = vm.ProjectOfInvitation.TenderOfferDatetime;
                    addVm.model.Model.NewDeadlineOfBidBond = vm.ProjectOfInvitation.DeadlineOfBidBond;
                    addVm.model.Model.NewOpeningBIdTime = vm.ProjectOfInvitation.OpeningBIdTime;
                }

                for (var j = 0; j < vm.ExcuteBudget.length; j++) {
                    var Package = vm.getPackage(vm.ExcuteBudget[j].Id, addVm.PackageOfResultNotice);
                    var data = {
                        PackageId: vm.ExcuteBudget[j].Id,
                        ItemName: vm.ExcuteBudget[j].ItemName,
                        PackageName: vm.ExcuteBudget[j].PackageName,
                        OldWinningBidder: '',
                        NewWinningBidder: '',
                        OldTypeOfEnterprise: '',
                        NewTypeOfEnterprise: '',
                        OldWinningBidAmount: '',
                        NewWinningBidAmount: '',
                        checked: false,
                        Remark: ''
                    };
                    if (!addVm.isResult) {
                        data.checked = true;
                    }
                    if (Package != [] && Package) {
                        if (!addVm.isScrapBag) {
                            data.OldWinningBidder = Package.WinningBidder;
                            data.NewWinningBidder = Package.WinningBidder;
                            data.OldTypeOfEnterprise = Package.TypeOfEnterprise;
                            data.NewTypeOfEnterprise = Package.TypeOfEnterprise;
                            data.OldWinningBidAmount = Package.WinningBidAmount;
                            data.NewWinningBidAmount = Package.WinningBidAmount;
                        } else {
                            data.OldWinningBidder = Package.WinningBidder;
                            data.OldTypeOfEnterprise = Package.TypeOfEnterprise;
                            data.OldWinningBidAmount = Package.WinningBidAmount;
                        }
                    }
                    addVm.model.List.push(data);
                }
                addVm.getTime();
                console.info('addVm.isResult---' + addVm.isResult);
            },
            checkOne: function (e) {
                var checked = e.target.checked
                if (checked === false) {
                    addVm.allchecked = false
                } else {
                    addVm.allchecked = addVm.model.List.every(function (el) {
                        return el.checked
                    })
                }
            },
            getEnterpriseType: function () {
                Dictionary.getCategoryDictionary('get', '企业类型', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        addVm.enterpriseType = obj.reverse();
                        addVm.onLoad();
                    } else {
                        console.info('获取企业类型失败！');
                        console.info(strErro);
                    }
                })
            },
            getClass: function (text, selectText) {
                if (selectText == text) {
                    return 'active';
                }
            },
            clickReason: function (e) {
                addVm.model.Model.Reason = e.target.innerText;
            },
            clickDeadline: function (value) {
                addVm.isDeadline = value;
                if (addVm.isDeadline) {
                    addVm.getTime();
                }
            },
            clickCashDeposit: function (value) {
                addVm.isCashDeposit = value;
                if (addVm.isCashDeposit) {
                    addVm.getTime();
                }
            },
            clickOpeningTime: function (value) {
                addVm.isOpeningTime = value;
                if (addVm.isOpeningTime) {
                    addVm.getTime();
                }
            },
            clickRequire: function (value) {
                addVm.isRequire = value;
            },
            uploadAttachment: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.Model.Attachment = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadNoticeConfirmationLetter: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.Model.NoticeConfirmationLetter = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadNoticeScreenShot: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.Model.NoticeScreenShot = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadTechnicalRequirement: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.Model.TechnicalRequirement = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            changeTime: function (time, title) {
                if (time.getTime() < new Date().getTime()) {
                    $.oaNotify.error(' 【' + title + '】不能小于今天！');
                }
            },
            clickSubmit: function () {
                if (addVm.isScrapBag) {
                    var list = [];
                    for (var i = 0; i < addVm.model.List.length; i++) {
                        if (addVm.model.List[i].checked === true) {
                            addVm.model.List[i].Remark = addVm.Remark;
                            list.push(addVm.model.List[i].PackageId);
                        }
                    }
                    if (list.length == 0) {
                        $.oaNotify.error(' 请至少勾选一项！');
                        return;
                    } else {
                        addVm.model.Scrap = list;
                    }
                    if (addVm.Remark == '') {
                        $.oaNotify.error(' 请填写【所选分包废标原因】！');
                        return;
                    }
                    addVm.model.Model.Content = '废标';
                } else {
                    if (addVm.model.Model.Content == '') {
                        $.oaNotify.error(' 请填写【更正内容】！');
                        return;
                    }
                    if (addVm.model.Model.Attachment == '') {
                        $.oaNotify.error(' 请上传【更正附件】！');
                        return;
                    }
                    if (addVm.model.Model.NoticeConfirmationLetter == '') {
                        $.oaNotify.error(' 请上传【更正公告确认涵】！');
                        return;
                    }
                    if (addVm.isResult) {
                        for (var i = 0; i < addVm.model.List.length; i++) {
                            if (addVm.model.List[i].NewWinningBidder == '') {
                                $.oaNotify.error(' 请填写【中标/成交供应商】！');
                                return;
                                break;
                            }
                            if (addVm.model.List[i].NewWinningBidAmount == '') {
                                $.oaNotify.error(' 请填写【中标/成交金额】！');
                                return;
                                break;
                            }
                            if (addVm.model.List[i].NewTypeOfEnterprise == '') {
                                $.oaNotify.error(' 请选择【企业类型】！');
                                return;
                                break;
                            }
                        }
                    } else {
                        if (addVm.isDeadline) {
                            if (addVm.model.Model.NewTenderOfferDatetime = '') {
                                $.oaNotify.error(' 【更正报名截止时间】不能为空！');
                                return;
                            }
                        } else {
                            addVm.model.Model.NewTenderOfferDatetime = '';
                        }
                        if (addVm.isCashDeposit) {
                            if (addVm.model.Model.NewDeadlineOfBidBond = '') {
                                $.oaNotify.error(' 【更正投标保证金缴纳截至时间】不能为空！');
                                return;
                            }
                        } else {
                            addVm.model.Model.NewDeadlineOfBidBond = '';
                        }
                        if (addVm.isOpeningTime) {
                            if (addVm.model.Model.NewOpeningBIdTime = '') {
                                $.oaNotify.error(' 【更正开标时间】不能为空！');
                                return;
                            }
                        } else {
                            addVm.model.Model.NewOpeningBIdTime = '';
                        }
                        if (addVm.isRequire) {
                            if (!addVm.model.Model.TechnicalRequirement || addVm.model.Model.TechnicalRequirement == '') {
                                $.oaNotify.error(' 请上传【更正技术要求】！');
                                return;
                            }
                        } else {
                            addVm.model.Model.TechnicalRequirement = '';
                        }
                    }
                }

                var data = {
                    ModelOfExecuteProjectOfCorrection: addVm.model.Model.$model,
                    ListOfPackageOfResultNoticeOfCorrection: addVm.model.List.$model,
                    ListOfRejectPackageId: addVm.model.Scrap
                }
                console.info('data----');
                console.info(data);
                addVm.addExecuteProjectOfCorrection(data);
            },
            addExecuteProjectOfCorrection: function (data) {
                ProjectExecute.addExecuteProjectOfCorrection('post', data, function addExecuteProjectOfCorrectionListener(success, obj, strErro) {
                    if (success) {
                        vm.ExecuteProjectOfCorrection.push(addVm.model.Model.$model);
                        vm.getExecuteProjectDetail();
                        vm.clickBtnReturn();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            getTime: function () {
                $('.form-hour').datetimepicker({
                    format: 'yyyy-mm-dd hh:00:00',
                    showMeridian: true,
                    autoclose: true,
                    minView: 1,
                    startDate: new Date(),
                    todayBtn: true,
                    language: 'zh-CN'
                });
            }
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });
        addVm.getEnterpriseType();
        avalon.scan(document.body);
    });
});