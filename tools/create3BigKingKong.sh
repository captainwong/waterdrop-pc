#!/bin/bash

set -e

path=$1
export=1

if [[ $# -eq 3 ]]; then
  name=$2
  if [[ "$3" -eq "no" ]]; then
    export=0
  fi
elif [[ $# -eq 2 ]]; then
  name=$2
else
  name=`basename ${path}`
  name=${name^}
fi

mkdir -p ${path}
touch ${path}/${name}.tsx
touch ${path}/${name}.module.css
if [[ ${export} -eq 1 ]]; then
  touch ${path}/index.ts
fi

printf "import React from 'react';\nimport styles from './%s.module.css';\n\nexport const %s : React.FC = () => {\n  return (\n    <>\n    </>\n  );\n}\n" ${name} ${name} >> ${path}/${name}.tsx

if [[ ${export} -eq 1 ]]; then
  printf "export * from './%s\';\n" ${name} >> ${path}/index.ts
  parentIndex=`dirname ${path}`/index.ts
  folder=$(basename $path)
  if [ -f ${parentIndex} ]; then
    printf "export * from './%s';\n" ${folder} >> ${parentIndex}
  fi
fi
