<template>
<div>
  <h1>{{ msg }}</h1>
  <a-button @click="changeMsg">212</a-button>
  <a-table :columns="columns"
           :data-source="dataSource"
           :customRow="customRow"
           bordered>
    <template v-for="col in ['name', 'age', 'address']"
              #[col]="{ text, record }"
              :key="col">
      <div>
        <a-input v-if="editableData.key == record.key"
                 v-model:value="editableData[col]"
                 style="margin: -5px 0" />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template #operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="editableData.key == record.key">
          <a @click="save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?"
                        @confirm="cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table>
</div>
  <!-- <a-table :columns="columns"
           :data-source="dataSource"
           :customRow="customRow"
           bordered>
    <template v-for="col in ['name', 'age', 'address']"
              #[col]="{ text, record }"
              :key="col">
      <div>
        <a-input 
        v-if="editableData[record.key]"
                 v-model:value="editableData[record.key][col]"
                 style="margin: -5px 0" />
        <template v-else>
          {{record.key}}
          {{ text }}
        </template>
      </div>
    </template>
    <template #operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="editableData[record.key]">
          <a @click="save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?"
                        @confirm="cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="edit(record.key)">Edit</a>
        </span>
      </div>
    </template>
  </a-table> //多行编辑-->

  <!-- <button @click="state.count++">count is: {{ state.count }}</button> -->
  <!-- <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
</template>

<script setup>
import { defineComponent, reactive, defineProps, ref, defineEmit } from "vue";
import { getTable } from "../api/product/product";
import { cloneDeep } from "lodash-es";
const props = defineProps({
  msg: String,
});
const emit = defineEmit(['update:msg'])
console.log(props)

const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    slots: { customRender: "name" },
  },
  {
    title: "age",
    dataIndex: "age",
    width: "15%",
    slots: { customRender: "age" },
  },
  {
    title: "address",
    dataIndex: "address",
    width: "40%",
    slots: { customRender: "address" },
  },
  {
    title: "operation",
    dataIndex: "operation",
    slots: { customRender: "operation" },
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
// export default defineComponent({
//   setup () {
const dataSource = ref(data);
const editableData = reactive({});
const tableData = ref([])
const getTableData = async () => {

  var res = await getTable();
  tableData.value = res.data.detail
  console.log(tableData.value)
}
getTableData()
// props = {
//   visible: {
//     type: Boolean
//   }
// }
const edit = (key) => {
  // editableData[key] = cloneDeep(
  //   dataSource.value.filter((item) => key === item.key)[0]
  // ); //多行编辑

  if (editableData.key) {
    save(editableData.key)
  }
  Object.assign(
    editableData,
    dataSource.value.filter((item) => key === item.key)[0]
  );
  console.log(editableData);
};
const customRow = (record) => {
  return {
    onDblclick: () => {
      edit(record.key);
    },
  };
};
const save = (key) => {
  // Object.assign(
  //   dataSource.value.filter((item) => key === item.key)[0],
  //   editableData[key]
  // );
  // delete editableData[key];//多行编辑
  dataSource.value.forEach((el, i) => {
    if (el.key === key) {
      Object.assign(el, editableData);
    }
  });
  Object.assign(editableData, { key: "" });
};
const cancel = (key) => {
  // delete editableData[key];//多行编辑
  Object.assign(editableData, { key: "" });
  console.log(editableData);
};
const changeMsg = () => {
  emit('update:msg', '12345')
}
//     return {
//       dataSource,
//       columns,
//       editingKey: "",
//       editableData,
//       edit,
//       save,
//       cancel,
//       customRow,
//     };
//   },
// });
</script>

<style scoped>
a {
  color: #42b983;
}
.editable-row-operations a {
  margin-right: 20px;
}
</style>