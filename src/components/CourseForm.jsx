import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function CourseForm({ visible, initialValues = null, onCancel, onSubmit, formateurs = [] }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        titre: initialValues.titre || "",
        description: initialValues.description || "",
        image_url: initialValues.image_url || "",
        formateurId: initialValues.formateurId || initialValues.formateur?.id || ""
      });

      if (initialValues.image_url) {
        setFileList([{
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialValues.image_url
        }]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialValues, visible, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // si l'image a été uploadée, on prend l'url du fichier
      if (fileList.length > 0 && fileList[0].url) {
        values.image_url = fileList[0].url;
      } else {
        values.image_url = "";
      }

      onSubmit && onSubmit(values);
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // Convertir le fichier en Base64 pour l'exemple (sinon on peut envoyer directement au serveur)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileList([{
          uid: "-1",
          name: file.name,
          status: "done",
          url: reader.result
        }]);
      };
      return false; // empêcher l'upload automatique
    },
    fileList,
    onRemove: () => setFileList([])
  };

  return (
    <Modal
      title={initialValues ? "Modifier le cours" : "Nouveau cours"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={initialValues ? "Enregistrer" : "Créer"}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Titre" name="titre" rules={[{ required: true, message: "Veuillez entrer un titre" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Image du cours">
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>Choisir une image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
