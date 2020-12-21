#! /usr/bin/env python

import json
import os
from shutil import copyfile
import xlrd
import math

def json_output(data):
    return json.dumps(data, sort_keys=True, indent=4, separators=(',', ':'), ensure_ascii=False)

def output(dist, data):
    with open(os.path.join(dist), 'w', encoding='utf-8') as f:
        f.write(json_output(data))

school_info = []

def gao():
    data = xlrd.open_workbook(raw_path)
    table = data.sheet_by_index(0)
    logos = {}
    for filename in os.listdir(logo_src_path):
        if filename.split('.')[-1] in ['png', 'jpg', 'jpeg']:
            school_name = filename.split('.')[0]
            logos[school_name] = filename
    province = ''
    for rowNum in range(table.nrows):
        rowValue = table.row_values(rowNum)
        if rowValue[1] == '' and rowValue[2] == '' and rowValue[3] == '' and rowValue[4] == '':
            province = rowValue[0].split('（')[0]
        elif rowValue[0] == '序号':
            pass
        else:
            school = {}
            school['学校名称'] = rowValue[1]
            school['省份'] = province
            school['学校标识码'] = math.floor(rowValue[2])
            school['主管部门'] = rowValue[3]
            school['所在地'] = rowValue[4]
            school['办学层次'] = rowValue[5]
            school['备注'] = rowValue[6]
            if rowValue[1] in logos.keys():
                school['logoUrl'] = os.path.join(logo_base_path, logos[rowValue[1]])
            else:
                school['logoUrl'] = default_logo
            school_info.append(school)
    output(dist, school_info)

try:
    with open('./generate_json_config.json', 'r', encoding='utf-8') as f:
        config = json.load(f)
except FileNotFoundError:
    print('\'config.json\' not found!')
except json.JSONDecodeError as e:
    print(e)
    exit()

try:
    raw_path = config['raw_path']
    logo_src_path = config['logo_src_path']
    logo_base_path = config['logo_base_path']
    dist = config['dist']
    default_logo = config['default_logo']
    gao()
except Exception as e:
    print(e)

