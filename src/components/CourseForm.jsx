import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const CourseForm = ({ visible, onCancel, onSave, initialValues }) => {
  const [form] = Form.useForm();

  form.setFieldsValue(
    initialValues
      ? { ...initialValues, dateHeure: moment(initialValues.dateHeure) }
      : { titre: "", niveau: "Primaire", description: "", professeur: "", dateHeure: null, duree: 60 }
  );

  const handleOk = () => {
    form.validateFields().then((values) => {
      values.dateHeure = values.dateHeure.format("YYYY-MM-DDTHH:mm");
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? "Modifier le cours" : "Ajouter un cours"}
      okText="Enregistrer"
      cancelText="Annuler"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="titre" label="Titre" rules={[{ required: true, message: "Veuillez saisir le titre" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="niveau" label="Niveau" rules={[{ required: true }]}>
          <Select>
            <Option value="Primaire">Primaire</Option>
            <Option value="Collège">Collège</Option>
            <Option value="Lycée">Lycée</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="professeur" label="Professeur" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dateHeure" label="Date et heure" rules={[{ required: true }]}>
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="duree" label="Durée (minutes)" rules={[{ required: true }]}>
          <InputNumber min={10} max={300} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseForm;
