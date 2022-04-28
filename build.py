with open('./contracts/BoT_sol_BoT.abi') as f:
	abi_content = f.read()
	#print(abi_content)

with open('./contracts/address.txt') as f:
	address = f.read()
	#print(abi_content)

with open('./server.js') as f:
	content = f.read()
	p1 = content.find("/*BoT-FLAG-ABI1*/")+len("/*BoT-FLAG-ABI1*/")+1
	p2 = content.find("/*BoT-FLAG-ABI2*/")
	content = content[:p1]+"var abi = '"+abi_content+"'\n    "+content[p2:]
	p3 = content.find("/*BoT-FLAG-CON1*/")+len("/*BoT-FLAG-CON1*/")+1
	p4 = content.find("/*BoT-FLAG-CON2*/")
	content = content[:p3]+"var CONTRACT = \""+address+"\";\n    "+content[p4:]

with open('./server.js','w') as f:
	f.write(content)

with open('./public/assets/js/init.js') as f:
	content = f.read()
	p1 = content.find("/*BoT-FLAG-ABI1*/")+len("/*BoT-FLAG-ABI1*/")+1
	p2 = content.find("/*BoT-FLAG-ABI2*/")
	content = content[:p1]+"var abi = '"+abi_content+"'\n    "+content[p2:]
	p3 = content.find("/*BoT-FLAG-CON1*/")+len("/*BoT-FLAG-CON1*/")+1
	p4 = content.find("/*BoT-FLAG-CON2*/")
	content = content[:p3]+"var CONTRACT = \""+address+"\";\n    "+content[p4:]

with open('./public/assets/js/init.js','w') as f:
	f.write(content)

