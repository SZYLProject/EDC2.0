/*
 * @Author: your name
 * @Date: 2021-06-09 15:49:46
 * @LastEditTime: 2021-07-23 15:09:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dhc_edc2.0\src\views\visit\dictinaryTree.js
 */
import * as dictionary from '@/assets/js/dictionary'
export const dictinaryTree = [
	{
		name: '患者人口学信息',
		code: 1000,
		children: [
			{
				name: '患者人口学信息',
				code: 1001,
				formOptionList: [{
					itemName: '本人姓名',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value,
					// ddInputGuide: '姓名',
					itemNameEn: 'name'
				}, {
					itemName: '民族',
					controlType: 'TB',
					itemNameEn: 'nation'
				}, {
					itemName: '国籍',
					controlType: 'TB',
					itemNameEn: 'nationality'
				}, {
					itemName: '出身日期',
					controlType: 'DP',
					itemNameEn: 'birthday'
				}, {
					itemName: '职业类别',
					controlType: 'TB',
					itemNameEn: 'occupation'
				}, {
					itemName: '籍贯',
					controlType: 'ADSEL',
					itemNameEn: 'hometown'
				}, {
					itemName: '病案号码',
					controlType: 'TB',
					itemNameEn: 'nation'
				}, {
					itemName: '身份证号码',
					controlType: 'TB',
					itemNameEn: 'IDCard'
				}, {
					itemName: '门诊编号',
					controlType: 'TB',
					itemNameEn: 'outpatientNumber'
				}, {
					itemName: '出生地',
					controlType: 'TB',
					itemNameEn: 'nation'
				}, {
					itemName: '现住址',
					controlType: 'TB',
					itemNameEn: 'placeOfBirth'
				}, {
					itemName: '户口地址',
					controlType: 'TB',
					itemNameEn: 'accountAddress'
				}, {
					itemName: '现住地址邮编',
					controlType: 'NTX',
					itemNameEn: 'zipCode'
				}, {
					itemName: '工作单位',
					controlType: 'TB',
					itemNameEn: 'employer'
				}, {
					itemName: '工作单位地址',
					controlType: 'TB',
					itemNameEn: 'workAddress'
				}, {
					itemName: '工作单位电话',
					controlType: 'TB',
					itemNameEn: 'workUnitphone'
				}, {
					itemName: '工作单位邮编',
					controlType: 'NTX',
					itemNameEn: 'workUnitzipCode'
				}, {
					itemName: '联系人姓名',
					controlType: 'TB',
					itemNameEn: 'contactname'
				}, {
					itemName: '联系人地址',
					controlType: 'TB',
					itemNameEn: 'contactAddress'
				}, {
					itemName: '联系人电话',
					controlType: 'TB',
					itemNameEn: 'contactnumber'
				}, {
					itemName: '医疗付费方式',
					controlType: 'TB',
					itemNameEn: 'medicalpaymentmethod'
				}, {
					itemName: '首次诊断日期',
					controlType: 'DP',
					itemNameEn: 'dateofFirstDiagnosis'
				}, {
					itemName: '出诊年龄（岁）',
					controlType: 'NTX',
					itemNameEn: 'visityear',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 0,
						rangeUp: 200
					}
				}, {
					itemName: '出诊年龄（月）',
					controlType: 'NTX',
					itemNameEn: 'visitmonth',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 1,
						rangeUp: 12
					}
				}, {
					itemName: '出诊年龄（天）',
					controlType: 'NTX',
					itemNameEn: 'visitday',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 1,
						rangeUp: 361
					}
				}, {
					itemName: '住院总次数',
					controlType: 'NTX',
					itemNameEn: 'hospitalizationcount'
				}]
			}
		]
	},
	{
		name: '就诊记录',
		code: 2000,
		children: [
			{
				name: '全部就诊',
				code: 2001,
				formOptionList: [{
					itemName: '就诊/入院日期',
					controlType: 'DP',
					itemNameEn: 'admissiondate'
				}, {
					itemName: '就诊/入院科室',
					controlType: 'TB',
					itemNameEn: 'admissiondepartment'
				}, {
					itemName: '就诊/主治医师',
					controlType: 'TB',
					itemNameEn: 'admissiondoctor'
				}, {
					itemName: '就诊年龄',
					controlType: 'NTX',
					itemNameEn: 'ageOfVisit',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 0,
						rangeUp: 200
					}
				}, {
					itemName: '主诊断',
					controlType: 'TA',
					itemNameEn: 'mainDiagnosis'
				}, {
					itemName: '主诊断ICD10名称',
					controlType: 'TB',
					itemNameEn: 'nameMaindiagnosticICD10'
				}, {
					itemName: '主诊断ICD10编码',
					controlType: 'TB',
					itemNameEn: 'codeMaindiagnosticICD10'
				}, {
					itemName: '就诊类型',
					controlType: 'TB',
					itemNameEn: 'vistType'
				}, {
					itemName: '入院途径',
					controlType: 'TB',
					itemNameEn: 'admissionRoute'
				}, {
					itemName: '分组名称',
					controlType: 'TB',
					itemNameEn: 'groupNames'
				}, {
					itemName: '出院日期',
					controlType: 'DP',
					itemNameEn: 'dischargeDate'
				}, {
					itemName: '出院科室',
					controlType: 'DP',
					itemNameEn: 'dischargeDepartment'
				}, {
					itemName: '付费方式',
					controlType: 'TB',
					itemNameEn: 'pethodsMethods'
				}, {
					itemName: '离院方式',
					controlType: 'TB',
					itemNameEn: 'dethodMethod'
				}, {
					itemName: '转归情况',
					controlType: 'TB',
					itemNameEn: 'fituationSituation'
				}, {
					itemNameEn: 'numberOfHospitalizations',
					itemName: '住院次数',
					controlType: 'NTX',
					numConfig: {
						scopeValid: dictionary.scopeValidType[1].value,
						allowDecimal: dictionary.allowDecimalType[1].value
					}
				}, {
					itemName: '住院总费用',
					itemNameEn: 'totalCostOfHospitalization',
					controlType: 'NTX',
					numConfig: {
						scopeValid: dictionary.scopeValidType[1].value,
						allowDecimal: dictionary.allowDecimalType[0].value,
						decimalDigit: 2
					}
				}, {
					itemName: '住院自付金额',
					itemNameEn: 'outofpocketAmountForHospitalization',
					controlType: 'NTX',
					numConfig: {
						scopeValid: dictionary.scopeValidType[1].value,
						allowDecimal: dictionary.allowDecimalType[0].value,
						decimalDigit: 2
					}
				}]
			},
			{
				name: '住院',
				code: 2002,
				formOptionList: [{
					itemName: '就诊/主治医师',
					controlType: 'TB',
					itemNameEn: 'attendingPhysician'
				}, {
					itemName: '就诊类型',
					controlType: 'TB',
					itemNameEn: 'typeOfVisit'
				}, {
					itemName: '就诊年龄',
					controlType: 'NTX',
					itemNameEn: 'ageOfVisit',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 0,
						rangeUp: 200
					}
				}, {
					itemName: '主诊断',
					controlType: 'TA',
					itemNameEn: 'mainDiagnosis'
				}, {
					itemName: '主诊断ICD10名称',
					controlType: 'TB',
					itemNameEn: 'nameMaindiagnosticICD10'
				}, {
					itemName: '主诊断ICD10编码',
					controlType: 'TB',
					itemNameEn: 'codeMaindiagnosticICD10'
				}, {
					itemName: '就诊/入院日期',
					controlType: 'DP',
					itemNameEn: 'admissiondate'
				}, {
					itemName: '就诊/入院科室',
					controlType: 'TB',
					itemNameEn: 'admissiondepartment'
				}, {
					itemName: '入院途径',
					controlType: 'TB',
					itemNameEn: 'admissionRoute'
				}, {
					itemName: '出院日期',
					controlType: 'DP',
					itemNameEn: 'dischargeDate'
				}, {
					itemName: '出院科室',
					controlType: 'DP',
					itemNameEn: 'dischargeDepartment'
				}, {
					itemName: '付费方式',
					controlType: 'TB',
					itemNameEn: 'pethodsMethods'
				}, {
					itemName: '离院方式',
					controlType: 'TB',
					itemNameEn: 'dethodMethod'
				}, {
					itemName: '转归情况',
					controlType: 'TB',
					itemNameEn: 'fituationSituation'
				}, {
					itemNameEn: 'numberOfHospitalizations',
					itemName: '住院次数',
					controlType: 'NTX',
					numConfig: {
						scopeValid: dictionary.scopeValidType[1].value,
						allowDecimal: dictionary.allowDecimalType[1].value
					}
				}, {
					itemName: '住院总费用',
					itemNameEn: 'totalCostOfHospitalization',
					controlType: 'NTX',
					numConfig: {
						scopeValid: dictionary.scopeValidType[1].value,
						allowDecimal: dictionary.allowDecimalType[0].value,
						decimalDigit: 2
					}
				}, {
					itemName: '住院自付金额',
					itemNameEn: 'outofpocketAmountForHospitalization',
					controlType: 'NTX',
					numConfig: {
						scopeValid: dictionary.scopeValidType[1].value,
						allowDecimal: dictionary.allowDecimalType[0].value,
						decimalDigit: 2
					}
				}]
			},
			{
				name: '门诊',
				code: 2003,
				formOptionList: [{
					itemName: '就诊/入院科室',
					controlType: 'TB',
					itemNameEn: 'admissiondepartment'
				}, {
					itemName: '主诊断',
					controlType: 'TA',
					itemNameEn: 'mainDiagnosis'
				}, {
					itemName: '就诊/入院日期',
					controlType: 'DP',
					itemNameEn: 'admissiondate'
				}, {
					itemName: '就诊/主治医师',
					controlType: 'TB',
					itemNameEn: 'admissiondoctor'
				}, {
					itemName: '就诊类型',
					controlType: 'TB',
					itemNameEn: 'typeOfVisit'
				}, {
					itemName: '就诊年龄',
					controlType: 'NTX',
					itemNameEn: 'ageOfVisit',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 0,
						rangeUp: 200
					}
				}, {
					itemName: '主诊断ICD10编码',
					controlType: 'TB',
					itemNameEn: 'codeMaindiagnosticICD10'
				}, {
					itemName: '主诊断ICD10名称',
					controlType: 'TB',
					itemNameEn: 'nameMaindiagnosticICD10'
				}]
			},
			{
				name: '急诊',
				code: 2004,
				formOptionList: [{
					itemName: '就诊/入院科室',
					controlType: 'TB',
					itemNameEn: 'admissiondepartment'
				}, {
					itemName: '就诊/入院日期',
					controlType: 'DP',
					itemNameEn: 'admissiondate'
				}, {
					itemName: '就诊类型',
					controlType: 'TB',
					itemNameEn: 'typeOfVisit'
				}, {
					itemName: '就诊年龄',
					controlType: 'NTX',
					itemNameEn: 'ageOfVisit',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 0,
						rangeUp: 200
					}
				}, {
					itemName: '主诊断ICD10编码',
					controlType: 'TB',
					itemNameEn: 'codeMaindiagnosticICD10'
				}, {
					itemName: '就诊/主治医师',
					controlType: 'TB',
					itemNameEn: 'admissiondoctor'
				}, {
					itemName: '主诊断ICD10名称',
					controlType: 'TB',
					itemNameEn: 'nameMaindiagnosticICD10'
				}, {
					itemName: '主诊断',
					controlType: 'TA',
					itemNameEn: 'mainDiagnosis'
				}]
			}
		]
	},
	{
		name: '主诉现病史',
		code: 3000,
		children: [
			{
				name: '主诉',
				code: 3001,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '主诉',
					itemNameEn: 'chiefComplaint',
					controlType: 'TA'
				}]
			},
			{
				name: '现病史',
				code: 3002,
				formOptionList: [{
					itemNameEn: 'admissionTime',
					itemName: '入院时间',
					controlType: 'DP'
				}, {
					itemNameEn: 'whetherEmergencyPCISurgery',
					itemName: '是否急诊PCI手术',
					controlType: 'TB'
				}, {
					itemNameEn: 'spirit',
					itemName: '精神',
					controlType: 'TB'
				}, {
					itemNameEn: 'historyOfPresentIllnes',
					itemName: '现病史',
					controlType: 'TB'
				}, {
					itemNameEn: 'consciousness',
					itemName: '神志',
					controlType: 'TB'
				}, {
					itemNameEn: 'prehospitalCardiacArrest',
					itemName: '是否发生院前心脏骤停',
					controlType: 'TB'
				}, {
					itemNameEn: 'prehospitalVentricularTachycardia',
					itemName: '是否发生院前室颤室速',
					controlType: 'TB'
				}, {
					itemNameEn: 'appetite',
					itemName: '食欲',
					controlType: 'TB'
				}, {
					itemNameEn: 'positiveSymptoms',
					itemName: '阳性症状',
					controlType: 'TB'
				}, {
					itemNameEn: 'negativeSymptoms',
					itemName: '阴性症状',
					controlType: 'TB'
				}, {
					itemNameEn: 'decreasedUrineOutput',
					itemName: '是否尿量减少',
					controlType: 'TB'
				}, {
					itemNameEn: 'weightChangeValue',
					itemName: '体重改变数值',
					controlType: 'TB'
				}, {
					itemNameEn: 'constipate',
					itemName: '是否便秘',
					controlType: 'TB'
				}, {
					itemNameEn: 'theNatureOfWeightChange',
					itemName: '体重改变性质',
					controlType: 'TB'
				}, {
					itemNameEn: 'bloodyStool',
					itemName: '是否血便',
					controlType: 'TB'
				}, {
					itemNameEn: 'hematuria',
					itemName: '是否血尿',
					controlType: 'TB'
				}]
			},
			{
				name: '主诉-心绞痛发作信息',
				code: 3003,
				formOptionList: [{
					itemName: '心绞痛症状',
					itemNameEn: 'symptomsOfAnginaPectoris',
					controlType: 'TB'
				}, {
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '急性发作时间',
					itemNameEn: 'acuteAttackTime',
					controlType: 'DP'
				}]
			},
			{
				name: '主诉-阳性症状',
				code: 3004,
				formOptionList: [{
					itemName: '阳性症状名称',
					itemNameEn: 'positiveSymptomName',
					controlType: 'TB'
				}, {
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '病程',
					itemNameEn: 'courseOfDisease',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '既往史',
		code: 4000,
		children: [
			{
				name: '既往史',
				code: 4001,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '疾病名称',
					itemNameEn: 'diseaseName',
					controlType: 'TB'
				}, {
					itemName: '发病时间',
					itemNameEn: 'onsetTime',
					controlType: 'DP'
				}, {
					itemName: '病程',
					itemNameEn: 'courseOfDisease',
					controlType: 'TB'
				}]
			},
			{
				name: '既往史-既往心血管病手术信息',
				code: 4002,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '手术名称',
					itemNameEn: 'nameOfOperation',
					controlType: 'TB'
				}, {
					itemName: '手术时间',
					itemNameEn: 'operationTime',
					controlType: 'DP'
				}]
			},
			{
				name: '既往史-既往心血管病信息',
				code: 4003,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '疾病名称',
					itemNameEn: 'diseaseName',
					controlType: 'TB'
				}, {
					itemName: '发病时间',
					itemNameEn: 'onsetTime',
					controlType: 'DP'
				}, {
					itemName: '病程',
					itemNameEn: 'courseOfDisease',
					controlType: 'TB'
				}]
			},
			{
				name: '既往史-既往心血管病相关用药',
				code: 4004,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '药物分类',
					itemNameEn: 'drugClassification',
					controlType: 'TB'
				}, {
					itemName: '通用名(商品名)',
					itemNameEn: 'productName',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '个人史',
		code: 5000,
		children: [
			{
				name: '个人史',
				code: 5001,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '个人史',
					itemNameEn: 'personalHistory',
					controlType: 'TB'
				}, {
					itemName: '是否吸烟',
					itemNameEn: 'smoking',
					controlType: 'TB'
				}, {
					itemName: '烟龄(年)',
					itemNameEn: 'cigaretteAgeYears',
					controlType: 'TB'
				}, {
					itemName: '日吸烟量(支/天)',
					itemNameEn: 'dailySmoking',
					controlType: 'TB'
				}, {
					itemName: '是否戒烟',
					itemNameEn: 'quitSmoking',
					controlType: 'TB'
				}, {
					itemName: '戒烟年数(年)',
					itemNameEn: 'yearsOfQuittingSmoking',
					controlType: 'TB'
				}, {
					itemName: '是否饮酒',
					itemNameEn: 'drinking',
					controlType: 'TB'
				}, {
					itemName: '日饮酒量(克/天)',
					itemNameEn: 'dailyAlcoholConsumption',
					controlType: 'TB'
				}, {
					itemName: '酒龄(年)',
					itemNameEn: 'wineAge',
					controlType: 'TB'
				}, {
					itemName: '是否戒酒',
					itemNameEn: 'quitDrinking',
					controlType: 'TB'
				}, {
					itemName: '戒酒年数(年)',
					itemNameEn: 'yearsOfAbstinence',
					controlType: 'TB'
				}, {
					itemName: '是否有疫区接触史',
					itemNameEn: 'contactHistoryInTheAffectedArea',
					controlType: 'TB'
				}, {
					itemName: '是否有放射性物质接触史',
					itemNameEn: 'historyOfExposureToRadioactiveMaterials',
					controlType: 'TB'
				}, {
					itemName: '是否有毒物接触史',
					itemNameEn: 'historyOfToxicExposure',
					controlType: 'TB'
				}, {
					itemName: '毒物类型',
					itemNameEn: 'typeOfPoison',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '家族史',
		code: 6000,
		children: [
			{
				name: '家族史',
				code: 6001,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '是否有家族史',
					itemNameEn: 'familyHistory',
					controlType: 'TB'
				}]
			},
			{
				name: '家族史-家族疾病',
				code: 6002,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP'
				}, {
					itemName: '家族疾病名称',
					itemNameEn: 'familyDiseaseName',
					controlType: 'TB'
				}, {
					itemName: '家族疾病亲属关系',
					itemNameEn: 'familyDiseaseKinship',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '月经婚育史',
		code: 7000,
		children: [
			{
				name: '月经婚育史',
				code: 7001,
				formOptionList: [{
					itemNameEn: 'admissionTime',
					itemName: '入院时间',
					controlType: 'DP'
				}, {
					itemNameEn: 'oralContraceptives',
					itemName: '是否口服避孕药',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '月经婚育史',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '月经初潮年龄',
					controlType: 'TB'
				}, {
					itemName: '经期最长天数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '经期最短天数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '月经周期最长天数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '月经周期最短天数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否痛经',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '月经是否规律',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '末次月经日期',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '是否绝经',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '绝经年龄',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '怀孕次数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '生育个数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '流产次数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '活胎个数',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '生命体征',
		code: 8000,
		children: [
			{
				name: '生命体征',
				code: 8001,
				formOptionList: [{
					itemName: '检查时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '体温(摄氏度)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '心率(次/分)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '呼吸频率(次/分)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '舒张压(mmHg)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '收缩压(mmHg)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '脉搏(次/分)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '身高(cm)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '体重(kg)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			}
		]
	},
	// {
	// 	name: '体格检查',
	// 	code: 9000,
	// 	children: [
	// 		{
	// 			name: '体格检查',
	// 			code: 9001,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		}
	// 	]
	// },
	{
		name: '专科检查',
		code: 10000,
		children: [
			{
				name: '专科检查',
				code: 10001,
				formOptionList: [{
					itemName: '检查日期',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '心率(次/分)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有第三心音',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '专科检查',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有奔马律',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '心脏杂音的时期',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '心脏杂音的位置',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '心脏杂音的性质',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '心脏杂音的分级',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有心界叩诊增大',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否心尖搏动正常',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否可触及瓣膜区震颤',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否足背动脉搏动良好',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否下肢水肿',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '水肿程度',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否奇脉',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否水冲脉',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否毛细血管搏动征阳性',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '诊断',
		code: 11000,
		children: [
			{
				name: '全部诊断',
				code: 11001,
				formOptionList: [{
					itemNameEn: 'diagnosis',
					itemName: '诊断日期',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断类型',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断名称',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断ICD10名称',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断ICD10编码',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断来源',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断顺位',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断医生',
					controlType: 'TB'
				}]
			},
			{
				name: '冠心病诊断',
				code: 11002,
				formOptionList: [{
					itemNameEn: 'diagnosis',
					itemName: '诊断日期',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '冠心病类型',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '是否ST段抬高型心肌梗死',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '急性心梗部位',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: 'KILLIP分级',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断名称',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断ICD10名称',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断ICD10编码',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断类型',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断来源',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '诊断顺位',
					controlType: 'TB'
				}]
			},
			{
				name: '首诊信息',
				code: 11003,
				formOptionList: [{
					itemName: '冠心病首诊日期',
					controlType: 'DP',
					itemNameEn: 'admissiondate'
				}, {
					itemName: '冠心病首诊年龄',
					controlType: 'NTX',
					itemNameEn: 'ageAtFirstDiagnosisOfCoronaryHeartDisease',
					isRequired: dictionary.requiredFlag[0].value,
					numConfig: {
						scopeValid: dictionary.scopeValidType[0].value,
						allowDecimal: dictionary.allowDecimalType[1].value,
						rangeDown: 0,
						rangeUp: 200
					}
				}, {
					itemName: '冠心病首诊类型',
					controlType: 'TB',
					itemNameEn: 'typeOfFirstDiagnosisOfCoronaryHeartDisease'
				}]
			}
		]
	},
	// {
	// 	name: '检查',
	// 	code: 12000,
	// 	children: [
	// 		{
	// 			name: '全部检查',
	// 			code: 12001,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: 'X线检查',
	// 			code: 12002,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '腹部超声',
	// 			code: 12003,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '超声心动图',
	// 			code: 12004,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '心电图',
	// 			code: 12005,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '24小时动态心电图',
	// 			code: 12006,
	// 			formOptionList: [{
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '血管超声',
	// 			code: 12007,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '冠脉CTA',
	// 			code: 12008,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '心肌核素',
	// 			code: 12009,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '平板运动',
	// 			code: 12010,
	// 			formOptionList: [{
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '负荷超声心动图',
	// 			code: 12011,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '心肌核磁共振',
	// 			code: 12012,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		}
	// 	]
	// },
	// {
	// 	name: '检验',
	// 	code: 13000,
	// 	children: [
	// 		{
	// 			name: '自身抗体检查',
	// 			code: 13001,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '尿液分析',
	// 			code: 13002,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '甲状腺功能检查',
	// 			code: 13003,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '血常规',
	// 			code: 13004,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '感染标志物检测',
	// 			code: 13005,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '生化检查',
	// 			code: 13006,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: 'C肽释放试验',
	// 			code: 13007,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '凝血检查',
	// 			code: 13008,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '糖代谢测定',
	// 			code: 13009,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '便常规',
	// 			code: 13010,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '胸水检查',
	// 			code: 13011,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		},
	// 		{
	// 			name: '肾上腺激素测定',
	// 			code: 13012,
	// 			formOptionList: [{
	// 				itemNameEn: 'diagnosis',
	// 				itemName: '本人姓名',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '民族',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '国籍',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '职业类别',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'TB'
	// 			}, {
	// 				itemName: '籍贯',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'ADSEL'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}, {
	// 				itemName: '出身日期',
	// 				itemNameEn: 'diagnosis',
	// 				controlType: 'DP'
	// 			}]
	// 		}
	// 	]
	// },
	{
		name: '手术治疗',
		code: 14000,
		children: [
			{
				name: '手术',
				code: 14001,
				formOptionList: [{
					itemName: '手术开始时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术结束时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemNameEn: 'nameOfOperation',
					itemName: '手术名称(原值)',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '手术名称(归一)',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '术前诊断(原值)',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '术前诊断(ICD10名称)',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '术后诊断(原值)',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '术后诊断(ICD10名称)',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '手术过程描述',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '麻醉方法',
					controlType: 'TB'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '麻醉医师',
					controlType: 'TB'
				}, {
					itemName: '手术医师',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '"第一助手',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '手术记录来源',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			},
			{
				name: '冠脉造影及介入治疗',
				code: 14002,
				formOptionList: [{
					itemName: '手术开始时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术结束时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术记录来源',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '手术名称(原值)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '手术名称(归一)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '麻醉方法',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '麻醉医师',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术前诊断(原值)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术前诊断(ICD10名称)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术后诊断(原值)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术后诊断(ICD10名称)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '手术过程描述',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '手术医师',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '第一助手',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '穿刺路径',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '冠脉分布优势型',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否已有支架',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否原支架内再狭窄',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有侧支循环',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有冠脉肌桥',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有桥血管',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有冠脉开口异常',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有冠脉先天性缺如',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否有冠脉瘘',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否血栓抽吸',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否行IABP',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否行PTCA',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否术中植入支架',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否行OCT',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否测FFR',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否行IVUS',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否择期介入治疗',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否建议行冠脉搭桥术',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否造影剂过敏',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否冠脉夹层',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否冠脉无复流',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否冠脉穿孔',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否植入临时起搏器',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否室颤',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否高度房室传导阻滞',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否行电除颤术',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否心力衰竭',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否死亡',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否心脏骤停',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '术中是否心源性休克',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			},
			{
				name: '冠脉造影及介入治疗-冠脉血流TIMI分级',
				code: 14002,
				formOptionList: [{
					itemName: '手术开始时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术结束时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '冠脉名称',
					controlType: 'TB'
				}, {
					itemName: '介入前血流TIMI分级',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '介入后血流TIMI分级',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			},
			{
				name: '冠脉造影及介入治疗-植入支架信息',
				code: 14003,
				formOptionList: [{
					itemName: '手术开始时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术结束时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '冠脉名称',
					controlType: 'TB'
				}, {
					itemName: '支架型号',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '支架长度(mm)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '支架直径(mm)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			},
			{
				name: '冠脉造影及介入治疗-冠脉狭窄信息',
				code: 14004,
				formOptionList: [{
					itemName: '手术开始时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术结束时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '冠脉名称',
					controlType: 'TB'
				}, {
					itemName: '是否狭窄',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '狭窄部位',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '狭窄百分比(%)',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			},
			{
				name: '冠脉造影及介入治疗-术中治疗',
				code: 14005,
				formOptionList: [{
					itemName: '手术开始时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '手术结束时间',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemName: '药物通用名（商品名）',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '药物剂量',
					controlType: 'TB'
				}, {
					itemName: '药物剂量单位',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '随访',
		code: 15000,
		children: [
			{
				name: '随访',
				code: 15001,
				formOptionList: [{
					itemName: '随访日期',
					itemNameEn: 'diagnosis',
					controlType: 'DP'
				}, {
					itemNameEn: 'diagnosis',
					itemName: '是否死亡',
					controlType: 'TB'
				}, {
					itemName: '是否发生恶性心律失常',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '随访方式',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否发生心力衰竭',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '随访状态',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否发生脑出血',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '是否发生脑梗死',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}]
			}
		]
	},
	{
		name: '医嘱',
		code: 16000,
		children: [
			{
				name: '非药品类医嘱',
				code: 16001,
				formOptionList: [{
					itemName: '开立时间',
					itemNameEn: 'openingTime',
					controlType: 'DP'
				}, {
					itemName: '开始时间',
					itemNameEn: 'startingTime',
					controlType: 'DP'
				}, {
					itemName: '结束时间',
					itemNameEn: 'endTime',
					controlType: 'DP'
				}, {
					itemName: '单次剂量',
					itemNameEn: 'singleDose',
					controlType: 'TB'
				}, {
					itemName: '医嘱项目类型',
					itemNameEn: 'typesOfMedicalOrderItems6',
					controlType: 'TB'
				}, {
					itemName: '医嘱项目内容',
					itemNameEn: 'contentsOfMedicalOrderItems',
					controlType: 'TA'
				}, {
					itemName: '医嘱数量',
					itemNameEn: 'numberOfDoctorOrders',
					controlType: 'NTX'
				}, {
					itemName: '数量单位',
					itemNameEn: 'quantityUnit',
					controlType: 'TA'
				}, {
					itemName: '频次',
					itemNameEn: 'frequency',
					controlType: 'NTX'
				}, {
					itemName: '长期或临时',
					itemNameEn: 'longtermOrTemporary',
					controlType: 'TB'
				}, {
					itemName: '就诊类型',
					itemNameEn: 'typeOfVisit',
					controlType: 'TB'
				}, {
					itemName: '医嘱状态',
					itemNameEn: 'doctorOrderStatus',
					controlType: 'TB'
				}, {
					itemName: '开立科室',
					itemNameEn: 'openADepartment',
					controlType: 'TB'
				}, {
					itemName: '开立者',
					itemNameEn: 'issuer',
					controlType: 'ADSEL'
				}]
			},
			{
				name: '药品类医嘱',
				code: 16002,
				formOptionList: [{
					itemName: '开立日期',
					itemNameEn: 'issuanceDate',
					controlType: 'DP'
				}, {
					itemName: '开始时间',
					itemNameEn: 'startingTime',
					controlType: 'DP'
				}, {
					itemName: '结束时间',
					itemNameEn: 'endTime',
					controlType: 'DP'
				}, {
					itemNameEn: 'productName',
					itemName: '商品名',
					controlType: 'TB'
				}, {
					itemName: '通用名',
					itemNameEn: 'commonName',
					controlType: 'TB'
				}, {
					itemName: 'ATCClassificationLevel4',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: 'ATCClassificationLevel3',
					itemNameEn: 'diagnosis',
					controlType: 'TB'
				}, {
					itemName: '药物治疗学分类(ATC分类2级)',
					itemNameEn: 'ATCClassificationLevel2',
					controlType: 'TB'
				}, {
					itemName: '药物类别',
					itemNameEn: 'drugCategory',
					controlType: 'TB'
				}, {
					itemName: '药物剂型',
					itemNameEn: 'drugDosageForm',
					controlType: 'TB'
				}, {
					itemName: '药物规格',
					itemNameEn: 'drugSpecifications',
					controlType: 'TB'
				}, {
					itemName: '单次剂量',
					itemNameEn: 'singleDose',
					controlType: 'TB'
				}, {
					itemName: '单次剂量单位',
					itemNameEn: 'singleDoseUnit',
					controlType: 'TB'
				}, {
					itemName: '用药频次',
					itemNameEn: 'frequencyOfMedication',
					controlType: 'NTX'
				}, {
					itemName: '给药途径',
					itemNameEn: 'routeOfAdministration',
					controlType: 'TB'
				}, {
					itemName: '嘱托',
					itemNameEn: 'entrust',
					controlType: 'TA'
				}, {
					itemName: '使用总量',
					itemNameEn: 'totalUse',
					controlType: 'TB'
				}, {
					itemName: '使用总量单位',
					itemNameEn: 'useTotalUnit',
					controlType: 'TB'
				}, {
					itemName: '长期/临时/出院带药',
					itemNameEn: 'dischargeWithMedicine',
					controlType: 'TB'
				}, {
					itemName: '医嘱状态',
					itemNameEn: 'doctorOrderStatus',
					controlType: 'TB'
				}, {
					itemName: '开立科室',
					itemNameEn: 'openADepartment',
					controlType: 'TB'
				}, {
					itemName: '开立者',
					itemNameEn: 'issuer',
					controlType: 'ADSEL'
				}, {
					itemName: '医嘱来源',
					itemNameEn: 'sourceOfMedicalAdvice',
					controlType: 'TB'
				}]
			},
			{
				name: '中草药医嘱',
				code: 16003,
				formOptionList: [{
					itemNameEn: 'drugName',
					itemName: '药品名',
					controlType: 'TB'
				}, {
					itemName: '药物剂量',
					itemNameEn: 'drugDosage',
					controlType: 'TB'
				}, {
					itemName: '剂量单位',
					itemNameEn: 'dosageUnit',
					controlType: 'TB'
				}, {
					itemName: '开立日期',
					itemNameEn: 'issuanceDate',
					controlType: 'DP'
				}, {
					itemName: '开立科室',
					itemNameEn: 'openADepartment',
					controlType: 'TB'
				}, {
					itemName: '开立者',
					itemNameEn: 'issuer',
					controlType: 'ADSEL'
				}]
			}
		]
	},
	{
		name: '住院病情评估',
		code: 17000,
		children: [
			{
				name: '肾功能评估',
				code: 17001,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemNameEn: 'tIMIScoreHospitalizedSTEMIPatients',
					itemName: '术后肌酐清除率(ml/min)',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '术后肾小球滤过率(ml/min)',
					itemNameEn: 'tIMIScoreHospitalizedSTEMIPatientsNSTEMIUA',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '入院肌酐清除率(ml/min)',
					itemNameEn: 'crusadeScoreOfAdmission',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '入院肾小球滤过率(ml/min)',
					itemNameEn: 'crusadeScoreOfGRACE',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}]
			},
			{
				name: '急性冠脉综合征危险评分',
				code: 17002,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemNameEn: 'tIMIScoreHospitalizedSTEMIPatients',
					itemName: '入院STEMI患者TIMI评分',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '入院NSTEMI/UA患者TIMI评分',
					itemNameEn: 'cIMIScoreHospitalizedSTEMIPatientsNSTEMIUA',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '入院CRUSADE评分',
					itemNameEn: 'crusadeScoreOfAdmission',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '入院GRACE评分',
					itemNameEn: 'crusadeScoreOfGRACE',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}]
			},
			{
				name: '负荷量抗血小板药',
				code: 17003,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemNameEn: 'drugTradeName',
					itemName: '药物商品名',
					controlType: 'TB'
				}, {
					itemName: '药物通用名',
					itemNameEn: 'genericNameDrug',
					controlType: 'TB'
				}, {
					itemName: '药物单次剂量',
					itemNameEn: 'singleDoseDrug',
					controlType: 'TB'
				}, {
					itemName: '药物剂量单位',
					itemNameEn: 'drugDoseUnit',
					controlType: 'TB'
				}, {
					itemName: '用药距离发病时间',
					itemNameEn: 'timeDrugUse',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '用药距离手术时间',
					itemNameEn: 'timeOperation',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}]
			},
			{
				name: '急诊再灌注信息',
				code: 17004,
				formOptionList: [{
					itemName: '入院时间',
					itemNameEn: 'admissionTime',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemNameEn: 'isEmergencyThrombolyticTherapy',
					itemName: '是否行急诊溶栓治疗',
					controlType: 'TB'
				}, {
					itemName: '是否行急诊PCI手术',
					itemNameEn: 'isEmergencyPCI',
					controlType: 'TB'
				}, {
					itemName: '急诊溶栓距离发病时间',
					itemNameEn: 'emergencyThrombolysisTime',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '急诊PCI距离发病时间',
					itemNameEn: 'thetimeofPCIDistanceEmergency',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}]
			}
		]
	},
	{
		name: '院内不良事件',
		code: 18000,
		children: [
			{
				name: '院内不良事件',
				code: 18001,
				formOptionList: [{
					itemName: '住院时间',
					itemNameEn: 'Lengthofstay',
					controlType: 'DP',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemNameEn: 'isInfarctionOccur',
					itemName: '是否发生脑梗死',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '是否发生脑出血',
					itemNameEn: 'isCerebralHemorrhage',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '是否发生心力衰竭',
					itemNameEn: 'isheartFailure',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '是否死亡',
					itemNameEn: 'isdie',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}, {
					itemName: '是否发生恶性心律失常',
					itemNameEn: 'isMalignantarrhythmia',
					controlType: 'TB',
					isRequired: dictionary.requiredFlag[0].value
				}]
			}
		]
	}
]
